import React, { useState, useEffect, useRef } from 'react';
import { Link, Prompt, RouteComponentProps, useHistory } from 'react-router-dom';
import { CDataTable, CButton, CSpinner } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ConfirmPopup, Search, SelectLoadmore } from '../../../components';
import config, { listStatus } from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { addNo } from '../../../utils';
import { loadingSmall, pagination } from '../../../extensions';

const fields = [
  { key: 'no', _style: { width: '4%' } },
  { key: 'name', label: 'Title', _style: { width: 160 } },
  { key: 'description', _style: { width: '24%' } },
  { key: 'created_date', _style: { width: '8%' } },
  { key: 'modified_date', label: 'Last modified', _style: { width: '8%' } },
  { key: 'uploader', _style: { width: '10%' } },
  { key: 'tag', _style: { width: '5%' } },
  { key: 'views', _style: { width: '5%' } },
  { key: 'comment', _style: { width: '5%' } },
  { key: 'like', _style: { width: '5%' } },
  { key: 'status', _style: { width: '8%' } },
  { key: 'action', _style: { width: '10%' } },
];

type VideoDataType = {
  no: number;
  id: string;
  name: string;
  description: string;
  status: string;
  created_date: number;
  modified_date: number;
  tag: string;
  uploader: string;
  views: number;
  comment: number;
  like: number;
};

type CategoryDataType = {
  data: VideoDataType[];
  total: number;
  totalPages: number;
  loading: boolean;
  page: number;
};

const pageSize: number = 10;

const CategoryDetail: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));
  const history = useHistory();

  const params: any = props.match?.params;
  const categoryId = params.id;

  const [videos, setVideos] = useState<CategoryDataType>({
    data: [],
    total: 0,
    totalPages: 0,
    loading: true,
    page: 1,
  });
  const [status, setStatus] = useState<any>(null);
  const [searchText, setSearchText] = useState('');

  const [searchUploaderText, setSearchUploaderText] = useState('');
  const [uploaders, setUploaders] = useState<any>({ data: [], loading: true, full: false, page: 1 });
  const [selectedUploader, setSelectedUploader] = useState<any>(null);

  const [popupDeleteVideo, setPopupDeleteVideo] = useState({ show: false, id: '', name: '' });

  const pageChange = (newPage: number) => {
    if (videos.page !== newPage) {
      getVideos(searchText, newPage);
    }
  };

  useEffect(() => {
    callApi({ method: 'get', api: `/api/v1/admin/categories/${categoryId}` }, ({ status, data }: any) => {
      if (status === SUCCESS) {
        setCategoryInfo({ loading: false, ...data });
        setTitle({ ...title, editing: false, value: data.title });
        setDescription({ ...description, editing: false, value: data.description });
      } else {
        setCategoryInfo({ ...categoryInfo, loading: false });
      }
    });
    getMobilityUploaders('', 1);
  }, []);

  useEffect(() => {
    getVideos(searchText, 1);
  }, [status, selectedUploader]);

  const [categoryInfo, setCategoryInfo] = useState({ loading: true, title: '', description: '' });
  const [title, setTitle] = useState({ editing: false, loading: false, value: '' });
  const [description, setDescription] = useState({ editing: false, loading: false, value: '' });

  useEffect(() => {
    if (!title.editing) return;
    titleRef.current.focus();
  }, [title.editing]);

  useEffect(() => {
    if (!description.editing) return;
    descriptionRef.current.focus();
  }, [description.editing]);

  useEffect(() => {
    if (!title.editing && !description.editing) return;

    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [title.editing, description.editing]);

  let noItems = <div />;

  if (!videos.loading) {
    if (!videos.total) noItems = <div>No videos</div>;
  }

  const getVideos = (searchText: string, newPage: number) => {
    setVideos((videos: any) => {
      return { ...videos, loading: true };
    });
    callApi(
      {
        method: 'get',
        api: config.rest.getVideos(
          categoryId,
          selectedUploader ? selectedUploader.id : '',
          status ? status.id : '',
          pageSize,
          newPage,
          searchText,
          '',
        ),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setVideos({
            data: data.video.map((item: any, index: number) => addNo(item, index, newPage)),
            loading: false,
            total: data.total,
            totalPages: Math.ceil(data.total / pageSize),
            page: newPage,
          });
        } else
          setVideos((videos: any) => {
            return { ...videos, loading: false };
          });
      },
    );
  };

  const getMobilityUploaders = (uploaderName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: `/api/v1/admin/video/user?page_size=10&page_number=${page}&search_name=${uploaderName}`,
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setUploaders((uploaders: any) => {
            const newUsers = data.users.map((item: any) => {
              return { id: item.id, name: item.first_name + ' ' + item.last_name };
            });
            const users =
              page === 1 ? (uploaderName === '' ? [null, ...newUsers] : newUsers) : [...uploaders.data, ...newUsers];
            return { data: users, loading: false, full: data.users.length < 10, page: page };
          });
        }
      },
    );
  };

  const handleSave = (isTitle: boolean) => {
    isTitle ? setTitle({ ...title, loading: true }) : setDescription({ ...description, loading: true });
    callApi(
      {
        method: 'put',
        api: `/api/v1/admin/categories/${categoryId}`,
        body: {
          title: isTitle ? title.value : categoryInfo.title,
          description: isTitle ? categoryInfo.description : description.value,
        },
      },
      ({ status }: any) => {
        if (status === SUCCESS) {
          if (isTitle) {
            setTitle({ ...title, editing: false, loading: false });
            setCategoryInfo((categoryInfo) => {
              return { ...categoryInfo, title: title.value };
            });
          } else {
            setDescription({ ...description, editing: false, loading: false });
            setCategoryInfo((categoryInfo) => {
              return { ...categoryInfo, description: description.value };
            });
          }
        } else {
          if (isTitle) setTitle({ ...title, loading: false });
          else setDescription({ ...description, loading: false });
        }
      },
    );
  };
  const handleCancelTitle = () => setTitle({ ...title, editing: false, value: categoryInfo.title });
  const handleCancelDescription = () =>
    setDescription({ ...description, editing: false, value: categoryInfo.description });

  const handleDeleteVideo = () => {
    callApi(
      { method: 'delete', api: `/api/v1/admin/video/${popupDeleteVideo.id}`, loading: true },
      ({ status }: any) => {
        if (status === SUCCESS) {
          getVideos(searchText, 1);
        }
      },
    );
    setPopupDeleteVideo({ show: false, id: '', name: '' });
  };

  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  return (
    <div>
      {(title.editing || description.editing) && <Prompt when={true} message="Changes you made may not be saved." />}
      <Link className="pl-5 py-2 size-1" to="/admin/mobility/categories">
        Category Management
      </Link>
      <span className="size-0 pl-2">&gt; Edit Category</span>
      <div className="row p-5">
        <ConfirmPopup
          isVisible={popupDeleteVideo.show}
          title="Delete video"
          content={`Are you sure to delete the video ${popupDeleteVideo.name}`}
          leftButtonText="No"
          rightButtonText="Yes"
          leftButtonOnPress={() => setPopupDeleteVideo({ show: false, id: '', name: '' })}
          rightButtonOnPress={handleDeleteVideo}
          handleClose={() => setPopupDeleteVideo({ show: false, id: '', name: '' })}
        />
        <div className="col-md-3 py-5 px-4">
          {!categoryInfo.loading ? (
            <div className="pt-3 pr-3">
              <div className="py-3">Category</div>
              <div style={{ position: 'relative' }}>
                <input
                  ref={titleRef}
                  className="form-control"
                  placeholder="Category name"
                  disabled={!title.editing || title.loading}
                  value={title.value}
                  maxLength={100}
                  onChange={(e: any) => setTitle({ ...title, value: e.target.value })}
                />
                {!title.editing && (
                  <i
                    className="fa fa-pencil cursor-pointer"
                    onClick={() => setTitle({ ...title, editing: true })}
                    style={{ position: 'absolute', right: 10, top: 12 }}
                  />
                )}
              </div>
              {title.editing && (
                <div className="pt-3" style={{ textAlign: 'right', width: '100%' }}>
                  <CButton style={{ width: 80 }} color="secondary" className="mr-3" onClick={handleCancelTitle}>
                    Cancel
                  </CButton>
                  <CButton
                    style={{ width: 80 }}
                    color="primary"
                    onClick={() => handleSave(true)}
                    disabled={title.value.trim() === '' || title.loading || title.value === categoryInfo.title}
                  >
                    {title.loading ? <CSpinner size="sm" color="light" /> : 'Save'}
                  </CButton>
                </div>
              )}
              <div className="py-3">Description</div>
              <div style={{ position: 'relative' }}>
                <textarea
                  ref={descriptionRef}
                  className="form-control"
                  rows={12}
                  placeholder="Description"
                  disabled={!description.editing || description.loading}
                  value={description.value}
                  maxLength={1000}
                  onChange={(e: any) => setDescription({ ...description, value: e.target.value })}
                />
                {!description.editing && (
                  <i
                    className="fa fa-pencil cursor-pointer"
                    onClick={() => setDescription({ ...description, editing: true })}
                    style={{ position: 'absolute', right: 10, top: 12 }}
                  />
                )}
              </div>
              {description.editing && (
                <div className="pt-3" style={{ textAlign: 'right', width: '100%' }}>
                  <CButton style={{ width: 80 }} color="secondary" className="mr-3" onClick={handleCancelDescription}>
                    Cancel
                  </CButton>
                  <CButton
                    style={{ width: 80 }}
                    color="primary"
                    onClick={() => handleSave(false)}
                    disabled={description.loading || description.value === categoryInfo.description}
                  >
                    {description.loading ? <CSpinner size="sm" color="light" /> : 'Save'}
                  </CButton>
                </div>
              )}
            </div>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center' }}>{loadingSmall}</div>
          )}
        </div>
        <div className="col-md-9">
          <div className="d-flex align-items-center justify-content-between mt-2 mb-5">
            <div className="d-flex">
              <div style={{ width: 250 }}>
                <Search
                  searchName={searchText}
                  setSearchName={setSearchText}
                  className="mr-3"
                  searchEmpty={true}
                  callbackSearch={(searchName) => getVideos(searchName, 1)}
                />
              </div>
              <div style={{ width: 250 }}>
                <SelectLoadmore
                  className="mr-3"
                  selected={status}
                  setSelected={setStatus}
                  defaultValue="Select status"
                  data={listStatus}
                  loading={false}
                  full={true}
                  value={status ? status.name : ''}
                />
              </div>
              <div style={{ width: 250 }}>
                <SelectLoadmore
                  className="mr-3"
                  selected={selectedUploader}
                  setSelected={setSelectedUploader}
                  defaultValue="Select uploader"
                  value={searchUploaderText}
                  setValue={setSearchUploaderText}
                  callbackSearch={getMobilityUploaders}
                  {...uploaders}
                  validation={config.validate.valueTypingExpressionsName}
                  maxLength={50}
                />
              </div>
            </div>
          </div>
          <div style={{ minHeight: '65vh', textAlign: 'center' }}>
            <CDataTable
              items={videos.data}
              fields={fields}
              loading={videos.loading}
              noItemsViewSlot={noItems}
              hover
              striped
              scopedSlots={{
                no: (item: VideoDataType) => <td className="align-middle">{item.no}</td>,
                name: (item: VideoDataType) => (
                  <td className="align-middle" title={item?.name?.length > 30 ? item?.name : ''}>
                    <span style={{ overflowWrap: 'break-word', display: 'inline-block', width: 150 }}>
                      {item?.name?.length > 30 ? item?.name?.substring(0, 30 - 3) + '...' : item?.name}
                    </span>
                  </td>
                ),
                description: (item: VideoDataType) => (
                  <td
                    style={{ height: 80 }}
                    className="align-middle"
                    title={item?.description?.length > 60 ? item?.description : ''}
                  >
                    {item?.description?.length > 60
                      ? item?.description?.substring(0, 60 - 3) + '...'
                      : item?.description}
                  </td>
                ),
                created_date: (item: VideoDataType) => (
                  <td className="align-middle">
                    {!item?.created_date ? '-' : moment(item?.created_date * 1000).format('DD/MM/YYYY')}
                  </td>
                ),
                uploader: (item: VideoDataType) => <td className="align-middle">{item.uploader}</td>,
                views: (item: VideoDataType) => <td className="align-middle">{item.views}</td>,
                comment: (item: VideoDataType) => <td className="align-middle">{item.comment}</td>,
                like: (item: VideoDataType) => <td className="align-middle">{item.like}</td>,
                modified_date: (item: { modified_date: any }) => (
                  <td className="align-middle">
                    {!item?.modified_date ? '-' : moment(item?.modified_date * 1000).format('DD/MM/YYYY')}
                  </td>
                ),
                status: (item: VideoDataType) => <td className="align-middle">{item.status}</td>,
                tag: (item: VideoDataType) => {
                  if (!item.tag) return <td className="align-middle">-</td>;
                  const tags = item.tag.split(',');
                  const showMore = tags.length > 2;
                  if (showMore) tags[1] += ' ...';
                  return (
                    <td title={showMore ? item.tag : ''} className="align-middle">
                      {tags.slice(0, 2).map((i) => (
                        <div>{i}</div>
                      ))}
                    </td>
                  );
                },
                action: (item: VideoDataType) => (
                  <td className="align-middle">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      style={{
                        marginRight: 10,
                      }}
                      onClick={() => setPopupDeleteVideo({ show: true, id: item.id, name: item.name })}
                    >
                      <i className="fas fa-trash-alt"> </i>
                    </CButton>
                  </td>
                ),
              }}
            />
          </div>
          {pagination(videos.totalPages, videos.page, pageChange, videos.total)}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
