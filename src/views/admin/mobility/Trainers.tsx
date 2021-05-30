import React, { useState, useEffect } from 'react';
import { Prompt, RouteComponentProps, useHistory } from 'react-router-dom';
import { CDataTable, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import ModalTrainer from './ModalTrainer';
import { ConfirmPopup } from '../../../components';
import Search from '../../../components/search/Search';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import ModalTrainerFollowers from './ModalTrainerFollowers';
import moment from 'moment';
import { ls, pagination } from '../../../extensions';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from '../../../theme';
import ReactLoading from 'react-loading';

const fields = [
  { key: 'no', _style: { width: '4%' } },
  { key: 'avatar', _classes: 'th-pl-30', _style: { width: '8%' } },
  { key: 'first_name', _style: { width: '10%' } },
  { key: 'last_name', _style: { width: '10%' } },
  { key: 'intro_video_status', _style: { width: '10%' } },
  { key: 'description', _style: { width: '16%' } },
  { key: 'created_date', _style: { width: '8%' } },
  { key: 'views', _style: { width: '4%' } },
  { key: 'video_number', label: 'Videos', _style: { width: '4%' } },
  { key: 'follow_number', label: 'Followers', _style: { width: '4%' } },
  { key: 'action', _style: { width: '6%' } },
];

const initialValues = {
  id: '',
  avatar: '',
  first_name: '',
  last_name: '',
  description: '',
};

type TrainerDataType = {
  no: number;
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  description: string;
  created_date: number;
  views: number;
  video_number: number;
  follow_number: number;
};

type TrainersDataType = {
  data: TrainerDataType[];
  total: number;
  totalPages: number;
  loading: boolean;
};

const pageSize = 10;

const Trainers: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));

  const history = useHistory();
  const query = new URLSearchParams(props.location?.search);
  const page = Math.max(Number(query.get('page')) || 1, 1);
  const lsUploadingVideos: any[] = JSON.parse(ls.get('videosUploading')) || [];

  const [trainers, setTrainers] = useState<TrainersDataType>({
    data: [],
    total: 0,
    totalPages: 0,
    loading: true,
  });
  const [trainerData, setTrainerData] = useState<{ show: boolean; initialValues: any; type: 'create' | 'update' }>({
    show: false,
    initialValues,
    type: 'create',
  });
  const [popupDeleteTrainer, setPopupDeleteTrainer] = useState({ show: false, id: '', name: '' });
  const [modalFollowers, setModalFollowers] = useState({ show: false, id: '', trainerName: '' });
  const [uploadingVideos, setUploadingVideos] = useState<any[]>([]);

  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (trainerData.show || uploadingVideos.length !== 0) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [uploadingVideos, trainerData.show]);

  const pageChange = (newPage: number) => {
    if (page !== newPage) {
      history.push(`?page=${newPage}`);
      getTrainers(newPage, searchName);
    }
  };

  useEffect(() => {
    getTrainers(page, searchName);
  }, []);

  let noItems = <div />;

  if (!trainers.loading) {
    if (!trainers.total) noItems = <div>{t('no-items-found')}</div>;
  }

  const getTrainers = (newPage: number, searchName: string) => {
    setTrainers({ ...trainers, loading: true });
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetMobilityTrainers(newPage, searchName),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setTrainers({
            data: data.trainers.map((item: any, index: number) => {
              return { ...item, no: index + 1 + pageSize * (newPage - 1) };
            }),
            total: data.total,
            totalPages: Math.ceil(data.total / pageSize),
            loading: false,
          });
          if (page !== newPage) history.push(`?page=${newPage}`);
        } else {
          setTrainers((trainers: any) => {
            return { ...trainers, loading: false };
          });
        }
      },
    );
  };

  const handleDeleteTrainer = (id: string) => {
    setPopupDeleteTrainer({ show: false, id: '', name: '' });
    setTrainers({ ...trainers, loading: true });
    callApi({ method: 'delete', api: config.rest.adminMobilityTrainer(id) }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        getTrainers(page, searchName);
      } else
        setTrainers((trainers: any) => {
          return { ...trainers, loading: false };
        });
    });
  };

  return (
    <div style={{ width: '90%', margin: '10px auto' }}>
      {uploadingVideos.length > 0 && <Prompt when={true} message="Changes you made may not be saved." />}
      <ModalTrainer
        trainers={trainers.data}
        uploadingVideos={uploadingVideos}
        setUploadingVideos={setUploadingVideos}
        type={trainerData.type}
        callApi={callApi}
        initialValues={trainerData.initialValues}
        show={trainerData.show}
        handleClose={() => setTrainerData({ ...trainerData, show: false })}
        searchTrainers={() => getTrainers(page, searchName)}
      />
      <ModalTrainerFollowers
        {...modalFollowers}
        callApi={callApi}
        handleClose={() => setModalFollowers({ ...modalFollowers, show: false })}
      />
      <ConfirmPopup
        isVisible={popupDeleteTrainer.show}
        title="Delete Trainer"
        content={`Are you sure to delete the trainer "${popupDeleteTrainer.name}"?`}
        leftButtonText="Cancel"
        rightButtonText="Delete"
        leftButtonOnPress={() => setPopupDeleteTrainer({ show: false, id: '', name: '' })}
        rightButtonOnPress={() => handleDeleteTrainer(popupDeleteTrainer.id)}
      />
      <div>
        <h2>Trainer Management</h2>
        <div className="d-flex align-items-center mt-4" style={{ marginBottom: '2.4rem' }}>
          <Search
            className="mr-5"
            searchName={searchName}
            setSearchName={setSearchName}
            searchEmpty={true}
            callbackSearch={(searchName: string) => getTrainers(1, searchName)}
          />
          <div style={{ textAlign: 'right', flex: 1 }}>
            <CButton
              color="primary"
              onClick={() =>
                setTrainerData({
                  show: true,
                  type: 'create',
                  initialValues,
                })
              }
            >
              Create new trainer
            </CButton>
          </div>
        </div>
      </div>
      <div style={{ minHeight: '65vh' }}>
        <CDataTable
          items={trainers.data}
          fields={fields}
          loading={trainers.loading}
          noItemsViewSlot={noItems}
          hover
          striped
          scopedSlots={{
            no: (item: TrainerDataType) => <td className="align-middle">{item.no}</td>,
            avatar: (item: TrainerDataType) => (
              <td className="align-middle">
                <img
                  src={item.avatar}
                  style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto', objectFit: 'cover' }}
                />
              </td>
            ),
            first_name: (item: TrainerDataType) => (
              <td title={item.first_name.length > 90 ? item.first_name : ''} className="align-middle">
                {item.first_name.length > 90 ? item.first_name.substring(0, 87) + '...' : item.first_name}
              </td>
            ),
            last_name: (item: TrainerDataType) => (
              <td title={item.last_name.length > 90 ? item.last_name : ''} className="align-middle">
                {item.last_name.length > 90 ? item.last_name.substring(0, 87) + '...' : item.last_name}
              </td>
            ),
            intro_video_status: (item: any) => {
              const status =
                lsUploadingVideos.findIndex((i) => i === item.id) > -1 &&
                uploadingVideos.findIndex((i: { id: string }) => i.id === item.id) === -1
                  ? 'Upload Failed'
                  : item.intro_video_status;
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
            description: (item: TrainerDataType) => (
              <td title={item.description.length > 90 ? item.description : ''} className="align-middle">
                {item.description.length > 90 ? item.description.substring(0, 87) + '...' : item.description}
              </td>
            ),
            created_date: (item: TrainerDataType) => (
              <td className="align-middle">
                {!item.created_date ? '-' : moment(item.created_date * 1000).format('DD/MM/YYYY')}
              </td>
            ),
            views: (item: TrainerDataType) => <td className="align-middle">{item.views}</td>,
            video_number: (item: TrainerDataType) => {
              const element =
                item.video_number > 0 ? (
                  <div className="link" onClick={() => history.push(`/admin/mobility/trainers/${item.id}`)}>
                    {item.video_number}
                  </div>
                ) : (
                  <div>{item.video_number}</div>
                );
              return <td className="align-middle">{element}</td>;
            },
            follow_number: (item: TrainerDataType) => {
              const element =
                item.follow_number > 0 ? (
                  <div
                    className="link"
                    onClick={() =>
                      setModalFollowers({
                        ...modalFollowers,
                        show: true,
                        id: item.id,
                        trainerName: item.first_name + ' ' + item.last_name,
                      })
                    }
                  >
                    {item.follow_number}
                  </div>
                ) : (
                  <div>{item.follow_number}</div>
                );
              return <td className="align-middle">{element}</td>;
            },
            action: (item: any) => (
              <td className="align-middle">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  style={{
                    marginRight: 10,
                  }}
                  onClick={() =>
                    setTrainerData({
                      show: true,
                      type: 'update',
                      initialValues: item,
                    })
                  }
                >
                  <i className="fas fa-pencil-alt"> </i>
                </CButton>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() =>
                    setPopupDeleteTrainer({ show: true, id: item.id, name: item.first_name + ' ' + item.last_name })
                  }
                >
                  <i className="fas fa-trash-alt"> </i>
                </CButton>
              </td>
            ),
          }}
        />
      </div>
      {pagination(trainers.totalPages, page, pageChange, trainers.total)}
    </div>
  );
};

export default Trainers;
