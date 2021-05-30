import { CButton, CDataTable } from '@coreui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Prompt, useHistory } from 'react-router-dom';
import { ConfirmPopup } from '../../../components';
import config, { listStatus, listPostureType, mappingPostureType } from '../../../config';
import { Container } from '../../../theme/styles';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { ModalVideoForm } from './ModalVideoForm';
import { colors } from '../../../theme';
import GlobalEvent from 'js-events-listener';
import { createToast } from '../../../store/toasts/actions';
import { ls, pagination } from '../../../extensions';
import ProgressBar from '@ramonak/react-progress-bar';
import Search from '../../../components/search/Search';
import ReactLoading from 'react-loading';
import { SelectLoadmore } from '../../../components';

const fields = [
  { key: 'no', _style: { width: '4%' } },
  { key: 'name', label: 'Title', _style: { width: 160 } },
  { key: 'description', _style: { width: '20%' } },
  { key: 'category_name', label: 'Category', _style: { width: '8%' } },
  { key: 'trainer_name', label: 'Trainer', _style: { width: '8%' } },
  { key: 'created_date', _style: { width: '8%' } },
  { key: 'modified_date', label: 'Last modified', _style: { width: '8%' } },
  { key: 'uploader', _style: { width: '10%' } },
  { key: 'tag', _style: { width: '4%' } },
  { key: 'posture_type', label: 'Type', _style: { width: '5%' } },
  { key: 'views', _style: { width: '5%' } },
  { key: 'comment', _style: { width: '5%' } },
  { key: 'status', _style: { width: '8%' } },
  { key: 'action', _style: { width: '10%' } },
];

const initFormValue = {
  title: '',
  posture_type: 'standing',
  description: '',
  category_id: '',
  trainer_id: '',
  tags: '',
  timeSchedule: null,
  video: null,
};

const pageSize: number = 10;

type ModalType = { show: boolean; type: 'create' | 'update'; videoId: string };

const defaultModal: ModalType = {
  show: false,
  type: 'create',
  videoId: '',
};

interface Props {
  trainerId?: string;
}

const Videos: React.FC<Props> = (props) => {
  const { trainerId } = props;

  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));
  const auth = useSelector((state: any) => state.auth);

  const history = useHistory();

  // video data
  const [videos, setVideos] = useState<any>({
    data: [],
    loading: false,
    page: 1,
    total: 0,
    totalPage: 0,
    trainerName: '',
  });

  // filter
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [postureType, setPostureType] = useState<any>(null);

  const [modal, setModal] = useState<ModalType>(defaultModal);
  const [formValue, setFormValue] = useState<any | null>(null);
  const [isVisiblePopupDeleteVideo, setIsVisiblePopupDeleteVideo] = useState(false);

  // search category
  const [searchCategoryText, setSearchCategoryText] = useState('');
  const [categories, setCategories] = useState<any>({ data: [], loading: true, full: false, page: 1 });
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // search trainer
  const [searchTrainerText, setSearchTrainerText] = useState('');
  const [trainers, setTrainers] = useState<any>({ data: [], loading: true, full: false, page: 1 });
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);

  const [uploadingVideos, setUploadingVideos] = useState<any[]>([]);

  const lsUploadingVideos: any[] = JSON.parse(ls.get('videosUploading')) || [];

  let noItems = <div>No videos were found matching your search</div>;
  if (videos.loading) noItems = <div />;

  const addNo = (item: any, index: number, newPage: number) => {
    if (isNaN(newPage)) newPage = videos.page;
    return { ...item, no: index + 1 + pageSize * (newPage - 1) };
  };

  useEffect(() => {
    getVideos(searchText);
  }, [status, selectedCategory, selectedTrainer, postureType]);

  useEffect(() => {
    if (modal.show || uploadingVideos.length !== 0) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [uploadingVideos, modal.show]);

  useEffect(() => {
    getMobilityCategories('', 1);
    getMobilityTrainers('', 1);

    if (lsUploadingVideos.length > 0) {
      callApi({
        method: 'put',
        api: '/api/v1/mobility/videos',
        body: {
          videos: lsUploadingVideos.map((item: string) => {
            return { id: item, status: 'Upload Failed' };
          }),
        },
      });
    }
    const handleVideoStatusEvent: any = GlobalEvent.on(config.socketEvent.processedVideo, (message: any) => {
      const recvData = message.data;
      const videoId = recvData?.video_id;
      const status = recvData?.status;
      if (videoId) {
        dispatch(createToast(`Video ${recvData?.title} has been Successfully processed`, 'success', 5000));
        setVideos((videos: any) => {
          const newVideos = { ...videos };
          const index = newVideos.data.findIndex((item: any) => item.id === videoId);
          if (index > -1) newVideos.data[index].status = status;
          return newVideos;
        });
      }
    });
    return () => {
      GlobalEvent.rm(handleVideoStatusEvent);
    };
  }, []);

  const getVideos = (searchText: string, newPage: number = 1) => {
    setVideos((videos: any) => {
      return { ...videos, loading: true };
    });
    callApi(
      {
        method: 'get',
        api: trainerId
          ? config.rest.getVideosOfTrainer(
              trainerId,
              selectedCategory ? selectedCategory.id : '',
              status ? status.id : '',
              pageSize,
              newPage,
              searchText,
              postureType ? postureType.id : '',
            )
          : config.rest.getVideos(
              selectedCategory ? selectedCategory.id : '',
              selectedTrainer ? selectedTrainer.id : '',
              status ? status.id : '',
              pageSize,
              newPage,
              searchText,
              postureType ? postureType.id : '',
            ),
      },
      (response: any) => {
        const { status, data } = response;

        if (status === SUCCESS) {
          setVideos({
            data: data.video.map((item: any, index: number) => addNo(item, index, newPage)),
            loading: false,
            total: data.total,
            totalPage: Math.ceil(data.total / pageSize),
            trainerName: data.trainer_name,
            page: newPage,
          });
          const failedVideos = data.video
            .map((item: any) => item.status)
            .filter((item: string) => item === 'Upload Failed');
          if (lsUploadingVideos.length > 0) {
            const videosUploadingNew = lsUploadingVideos.filter((item) => !failedVideos.includes(item));
            ls.set('videosUploading', JSON.stringify(videosUploadingNew));
          }
        } else
          setVideos((videos: any) => {
            return { ...videos, loading: false };
          });
      },
    );
  };

  const onCancelDeleteVideo = () => {
    setIsVisiblePopupDeleteVideo(false);
  };

  const onPageChange = (newPage: number) => {
    if (videos.page !== newPage) {
      getVideos(searchText, newPage);
    }
  };

  const getMobilityCategories = (categoryName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: `/api/v1/admin/categories?page_size=10&search_name=${categoryName}&page_number=${page}`,
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setCategories((categories: any) => {
            const newCates = data.data.map((item: any) => {
              return { id: item.id, name: item.title };
            });
            const cates =
              page === 1
                ? categoryName === ''
                  ? [null, { id: '1', name: 'Non-category' }, ...newCates]
                  : newCates
                : [...categories.data, ...newCates];
            return { data: cates, loading: false, full: data.data.length < 10, page: page };
          });
        }
      },
    );
  };

  const getMobilityTrainers = (trainerName: string, page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetMobilityTrainers(page, trainerName, true),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setTrainers((trainers: any) => {
            const newUsers = data.trainers.map((item: any) => {
              return { id: item.id, name: item.first_name + ' ' + item.last_name };
            });
            const users =
              page === 1
                ? trainerName === ''
                  ? [null, { id: '%23', name: 'Non-trainer' }, ...newUsers]
                  : newUsers
                : [...trainers.data, ...newUsers];
            return { data: users, loading: false, full: data.trainers.length < 10, page: page };
          });
        }
      },
    );
  };

  const onDeleteVideo = () => {
    setIsVisiblePopupDeleteVideo(false);
    callApi(
      {
        method: 'delete',
        api: config.rest.editVideo(formValue?.id),
        loading: true,
      },
      (response: any) => {
        if (response.status === SUCCESS) {
          getVideos(searchText);
        }
      },
    );
  };

  const satisfyFilter = (_status: string, category: string) => {
    return (
      _status.includes(status) && category.includes(selectedCategory.name) && auth.user_id.includes(selectedTrainer.id)
    );
  };

  return (
    <Container>
      <ModalVideoForm
        {...modal}
        formValue={formValue}
        handleClose={() => {
          setModal(defaultModal);
          setFormValue({
            ...initFormValue,
          });
        }}
        addNo={addNo}
        satisfyFilter={satisfyFilter}
        auth={auth}
        uploadingVideos={uploadingVideos}
        setUploadingVideos={setUploadingVideos}
        videos={videos}
        setVideos={setVideos}
        onSuccess={(videoId: string, body?: any) => {
          setVideos((videos: any) => {
            const newVideos = { ...videos };
            const index = newVideos.data.findIndex((item: any) => item.id === videoId);
            if (index > -1) {
              const oldStatus = newVideos.data[index].status;
              if (body)
                newVideos.data[index] = {
                  ...newVideos.data[index],
                  ...body,
                  status:
                    oldStatus === 'Uploading' || oldStatus === 'Processing'
                      ? oldStatus
                      : body.status === 1
                      ? 'Posted'
                      : 'Disable',
                };
              else if (modal.type === 'create' && oldStatus === 'Uploading')
                newVideos.data[index].status = 'Processing';
              if (oldStatus === 'Posted' || oldStatus === 'Disable')
                newVideos.data[index].modified_date = new Date().getTime() / 1000;
            }
            return newVideos;
          });
        }}
      />
      {uploadingVideos.length > 0 && <Prompt when={true} message="Changes you made may not be saved." />}
      <ConfirmPopup
        isVisible={isVisiblePopupDeleteVideo}
        title="Delete Video?"
        content={`Are you want to delete video ${formValue?.name}`}
        leftButtonText="No"
        rightButtonText="Yes"
        leftButtonOnPress={onCancelDeleteVideo}
        rightButtonOnPress={onDeleteVideo}
        centered
      />
      <div>
        <h2>
          {trainerId ? (
            <div className="d-flex">
              <Link className="d-flex align-items-center mr-3" to="/admin/mobility/trainers">
                <i className="fas fa-angle-left" />
              </Link>
              Videos Of {videos.trainerName}
            </div>
          ) : (
            'Video Management'
          )}
        </h2>
      </div>

      <div className="d-flex justify-content-between my-4">
        <div className="d-flex">
          <div style={{ width: 250 }}>
            <Search
              searchName={searchText}
              setSearchName={setSearchText}
              className="mr-3"
              searchEmpty={true}
              callbackSearch={getVideos}
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
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              defaultValue="Select category"
              value={searchCategoryText}
              setValue={setSearchCategoryText}
              callbackSearch={getMobilityCategories}
              {...categories}
              maxLength={100}
            />
          </div>
          {!trainerId && (
            <div style={{ width: 250 }}>
              <SelectLoadmore
                className="mr-3"
                selected={selectedTrainer}
                setSelected={setSelectedTrainer}
                defaultValue="Select trainer"
                value={searchTrainerText}
                setValue={setSearchTrainerText}
                callbackSearch={getMobilityTrainers}
                {...trainers}
                validation={config.validate.valueTypingExpressionsName}
                maxLength={50}
              />
            </div>
          )}
          <div style={{ width: 250 }}>
            <SelectLoadmore
              className="mr-3"
              selected={postureType}
              setSelected={setPostureType}
              defaultValue="Select type"
              data={listPostureType}
              loading={false}
              full={true}
              value={postureType ? postureType.name : ''}
            />
          </div>
        </div>
        {!trainerId && (
          <CButton
            onClick={() => {
              setFormValue(initFormValue);
              setModal({ show: true, type: 'create', videoId: '' });
            }}
            color="primary"
          >
            Upload new video
          </CButton>
        )}
      </div>
      <div>
        <CDataTable
          loading={videos.loading}
          items={videos.data}
          fields={trainerId ? fields.filter((item) => item.key !== 'trainer_name') : fields}
          noItemsViewSlot={noItems}
          hover
          striped
          scopedSlots={{
            no: (item: any) => <td className="align-middle">{item.no}</td>,
            name: (item: any) => (
              <td className="align-middle" title={item?.name?.length > 35 ? item?.name : ''}>
                <span style={{ overflowWrap: 'break-word', display: 'inline-block', width: 150 }}>
                  {item?.name?.length > 35 ? item?.name?.substring(0, 35 - 3) + '...' : item?.name}
                </span>
              </td>
            ),
            description: (item: { description: any }) => (
              <td
                style={{ height: 80 }}
                className="align-middle"
                title={item?.description?.length > 70 ? item?.description : ''}
              >
                {item?.description?.length > 70 ? item?.description?.substring(0, 70 - 3) + '...' : item?.description}
              </td>
            ),
            category_name: (item: any) => <td className="align-middle">{item.category_name}</td>,
            trainer_name: (item: any) => <td className="align-middle">{item.trainer_name|| "Non trainer"}</td>,
            created_date: (item: { created_date: any }) => (
              <td className="align-middle">
                {!item?.created_date ? '-' : moment(parseInt(item?.created_date) * 1000).format('DD/MM/YYYY')}
              </td>
            ),
            uploader: (item: any) => <td className="align-middle">{item.uploader}</td>,
            views: (item: any) => <td className="align-middle">{item.views}</td>,
            comment: (item: any) => <td className="align-middle">{item.comment}</td>,
            like: (item: any) => <td className="align-middle">{item.like}</td>,
            modified_date: (item: { modified_date: any }) => (
              <td className="align-middle">
                {!item?.modified_date ? '-' : moment(parseInt(item?.modified_date) * 1000).format('DD/MM/YYYY')}
              </td>
            ),
            status: (item: any) => {
              const status =
                lsUploadingVideos.findIndex((i) => i === item.id) > -1 &&
                uploadingVideos.findIndex((i: { id: string }) => i.id === item.id) === -1
                  ? 'Upload Failed'
                  : item.status;
              const index = uploadingVideos.findIndex((i) => i.id === item.id);
              let render = null;
              if (index > -1) {
                render = (
                  <div style={{ borderRadius: 100, overflow: 'hidden' }}>
                    <ProgressBar
                      labelColor="var(--primary)"
                      isLabelVisible={false}
                      completed={uploadingVideos[index].progress}
                      height={'10px'}
                      baseBgColor={colors.palette.lightBlue}
                      bgColor={colors.blue}
                      transitionDuration={'0.5s'}
                      transitionTimingFunction={'linear'}
                    />
                  </div>
                );
              } else if (item.status === 'Processing')
                render = (
                  <div className="d-flex" style={{ height: 20, marginLeft: 10 }}>
                    <ReactLoading type="bubbles" color="var(--primary)" width={40} />
                  </div>
                );

              return (
                <td className="align-middle">
                  {status}
                  {render}
                </td>
              );
            },
            tag: (item: { tag: string }) => {
              if (!item.tag) return <td className="align-middle">-</td>;
              const tags = item.tag.split(',');
              const showMore = tags.length > 2;
              if (showMore) tags[1] += ' ...';
              return (
                <td title={showMore ? item.tag : ''} className="align-middle">
                  {tags.slice(0, 2).map((i) => (
                    <div key={i}>{i}</div>
                  ))}
                </td>
              );
            },
            posture_type: (item: any) => <td className="align-middle">{mappingPostureType[item.posture_type]}</td>,
            action: (item: any) => {
              const status =
                lsUploadingVideos.findIndex((i) => i === item.id) > -1 &&
                uploadingVideos.findIndex((i: { id: string }) => i.id === item.id) === -1
                  ? 'Upload Failed'
                  : item.status;
              return (
                <td className="align-middle">
                  <CButton
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setFormValue({
                        ...item,
                        title: item?.name,
                        tags: item?.tag ? item?.tag?.split(',') : [],
                      });
                      setModal({ show: true, type: 'update', videoId: item.id });
                    }}
                    style={{ visibility: status === 'Upload Failed' ? 'hidden' : 'visible' }}
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    <i className="fas fa-pencil-alt"> </i>
                  </CButton>
                  <CButton
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setFormValue({ ...item });
                      setIsVisiblePopupDeleteVideo(true);
                    }}
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    <i className="fas fa-trash-alt"> </i>
                  </CButton>
                </td>
              );
            },
          }}
        />
      </div>
      {pagination(videos.totalPage, videos.page, onPageChange, videos.total)}
    </Container>
  );
};

export default Videos;
