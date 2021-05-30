import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CBadge, CDataTable, CPagination, CButton, CInput } from '@coreui/react';
import { statuses, mappingGender, mappingUserType, listUserStatus } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import PopupResetPassword from './PopupResetPassword';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useTranslation } from 'react-i18next';
import ModalViewDocuments from './ModalViewDocuments';
import { SelectLoadmore, StarRatingFloating } from '../../../components';
import Feedbacks from '../../user/consulting/Feedbacks';
import ModalSendEmail from './ModalSendEmail';
import { createDate, formatDate } from '../../../utils';
import './Users.scss';
import { pagination } from '../../../extensions';

const fieldsNurse = [
  { key: 'no', _style: { width: '3%' } },
  { key: 'first_name', _classes: 'font-weight-bold', _style: { width: '12%' } },
  { key: 'last_name', _classes: 'font-weight-bold', _style: { width: '12%' } },
  { key: 'email', _style: { width: '17%' } },
  { key: 'gender', _style: { width: '8%' } },
  { key: 'birth_date', _style: { width: '10%' }, label: 'Date Of Birth' },
  { key: 'feed_back', _style: { width: '10%' }, label: 'Feedback' },
  { key: 'verify_email', _style: { width: '10%' } },
  { key: 'status_id', label: 'Status', _style: { width: '8%' } },
  { key: 'action', _style: { width: '10%' } },
];

const fieldsOther = [
  { key: 'no', _style: { width: '4%' } },
  { key: 'first_name', _classes: 'font-weight-bold', _style: { width: '15%' } },
  { key: 'last_name', _classes: 'font-weight-bold', _style: { width: '15%' } },
  { key: 'email', _style: { width: '18%' } },
  { key: 'gender', _style: { width: '8%' } },
  { key: 'birth_date', label: 'Date Of Birth', _style: { width: '10%' } },
  { key: 'verify_email', _style: { width: '10%' } },
  { key: 'status_id', label: 'Status', _style: { width: '8%' } },
  { key: 'action', _style: { width: '8%' } },
];

const initialValuesCreate = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  status_id: 3,
};

const initialValuesUpdate = {
  first_name: '',
  last_name: '',
  email: '',
  status_id: 3,
  gender: '3',
  birth_date: null,
};

const pageSize = 10;

const Users: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const auth = useSelector((state: any) => state.auth);
  const isAdmin = auth.group_name === 'admin';

  const query = new URLSearchParams(props.location?.search);

  let paramType = query.get('type') || 'admin';
  let paramStatus = Number(query.get('status')) || 0;
  if (!['nurse', 'user', 'admin'].includes(paramType)) paramType = 'admin';
  if (paramStatus < 0 || paramStatus > 4) paramStatus = 0;

  const fields = paramType === 'nurse' ? fieldsNurse : fieldsOther;

  const getStatus = listUserStatus.filter((item: any) => item?.id === paramStatus)?.[0] || null;

  const [searchName, setSearchName] = useState('');
  const [type, setType] = useState(paramType);
  const [status, setStatus] = useState<any>(getStatus);
  const [users, setUsers] = useState<any>({ data: [], loading: true, total: 0, totalPages: 0, page: 1 });
  const [createUserData, setCreateUserData] = useState({ show: false, initialValues: initialValuesCreate });
  const [updateUserData, setUpdateUserData] = useState({ show: false, initialValues: initialValuesUpdate });
  const [popupResetData, setPopupResetData] = useState({ show: false, email: '', userId: '' });
  const [popupViewDocuments, setPopupViewDocuments] = useState({ show: false, id: '', userStatus: 0, userEmail: '' });
  const [firstTime, setFirstTime] = useState(false);
  const [modalFeedbacks, setModalFeedbacks] = useState({
    show: false,
    nurseId: '',
    nurseName: '',
    nurseThumbnail: '',
    nurseRating: 0.0,
  });
  const [modalSendEmail, setModalSendEmail] = useState({ show: false });
  const timeout = useRef<any>(0);

  const newType = mappingUserType[type];

  const searchUsers = (newPage: number) => {
    setUsers({ ...users, loading: true });
    callApi(
      {
        method: 'get',
        api: `/api/v1/admin/users/${newType}?status=${
          status ? status.id : ''
        }&page_size=${pageSize}&page_number=${newPage}&search_name=${searchName}`,
      },
      (response) => {
        const { data } = response;
        const status1 = response.status;
        if (status1 === SUCCESS) {
          setUsers({
            data: data.users.map((user: any, index: number) => {
              return { ...user, no: index + 1 + pageSize * (newPage - 1), birth_date: createDate(user.birth_date) };
            }),
            loading: false,
            total: data.total,
            totalPages: Math.ceil(data.total / pageSize),
            page: newPage,
          });
        } else setUsers({ ...users, loading: false });
      },
    );
  };

  useEffect(() => {
    setType(paramType);
    if (paramType !== 'nurse') setStatus(null);
    setUsers({ ...users, loading: true, data: [], total: 0, totalPages: 0 });
  }, [paramType]);

  useEffect(() => {
    setStatus(getStatus);
  }, [paramStatus]);

  useEffect(() => {
    if (firstTime) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        searchUsers(1);
      }, 1000);
    }
    setFirstTime(true);
  }, [searchName]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      searchUsers(1);
    }
  };

  const pageChange = (newPage: number) => {
    if (users.page !== newPage) {
      searchUsers(newPage);
    }
  };

  useEffect(() => {
    searchUsers(1);
  }, [status, type]);

  let noItems = <div />;

  if (!users.loading) {
    if (!users.total) noItems = <div>{t('no-items-found')}</div>;
  }

  const handleShowDocuments = (item: any) => {
    setPopupViewDocuments({ show: true, id: item.id, userStatus: item.status, userEmail: item.email });
  };

  const handleCloseDocuments = () => {
    setPopupViewDocuments({ ...popupViewDocuments, show: false });
  };

  return (
    <div style={{ width: '90%', margin: '10px auto' }}>
      <Feedbacks {...modalFeedbacks} handleClose={() => setModalFeedbacks({ ...modalFeedbacks, show: false })} />
      <ModalCreateUser
        initialValues={createUserData.initialValues}
        show={createUserData.show}
        handleClose={() => setCreateUserData({ show: false, initialValues: initialValuesCreate })}
        searchUsers={() => searchUsers(1)}
      />
      <ModalUpdateUser
        type={type}
        initialValues={updateUserData.initialValues}
        show={updateUserData.show}
        handleClose={() => setUpdateUserData({ show: false, initialValues: initialValuesUpdate })}
        searchUsers={() => searchUsers(1)}
      />
      <PopupResetPassword
        show={popupResetData.show}
        handleClose={() => setPopupResetData({ show: false, email: '', userId: '' })}
        email={popupResetData.email}
        userId={popupResetData.userId}
      />
      <ModalViewDocuments
        modalSendEmail={modalSendEmail}
        {...popupViewDocuments}
        setModalSendEmail={setModalSendEmail}
        handleClose={handleCloseDocuments}
        getUsers={searchUsers}
      />
      <ModalSendEmail
        callApi={callApi}
        {...modalSendEmail}
        popupViewDocuments={popupViewDocuments}
        handleClose={() => setModalSendEmail({ ...modalSendEmail, show: false })}
        handleCloseParent={handleCloseDocuments}
      />
      <div>
        <h3>
          {type === 'admin'
            ? 'Admin Management'
            : type === 'nurse'
            ? `Nurse ${status === 1 ? '- Pending Approval' : 'Management'}`
            : 'Basic Member Management'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>
          <div style={{ position: 'relative', width: 218, height: 35 }}>
            <CInput
              className="mr-3"
              style={{ width: 218, position: 'absolute', paddingLeft: 32 }}
              type="text"
              placeholder={t('search')}
              value={searchName}
              maxLength={50}
              onChange={(e: any) => setSearchName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i style={{ position: 'absolute', left: 10, top: 11, color: '#777' }} className="fa fa-search icon"></i>
          </div>
          {!paramStatus && (
            <div style={{ width: 250 }}>
              <SelectLoadmore
                className="mx-3"
                selected={status}
                setSelected={setStatus}
                defaultValue="Select status"
                data={
                  paramType === 'nurse'
                    ? listUserStatus
                    : listUserStatus.filter((item) => item?.id !== 1 && item?.id !== 4)
                }
                loading={false}
                full={true}
                value={status ? status.name : ''}
              />
            </div>
          )}
          {!isAdmin && paramType === 'admin' && (
            <div style={{ textAlign: 'right', flex: 1 }}>
              <CButton
                color="primary"
                onClick={() =>
                  setCreateUserData({
                    show: true,
                    initialValues: {
                      first_name: '',
                      last_name: '',
                      email: '',
                      password: '',
                      status_id: 3,
                    },
                  })
                }
              >
                {t('add-new-user')}
              </CButton>
            </div>
          )}
        </div>
      </div>
      <div>
        <CDataTable
          items={users.data}
          fields={fields}
          loading={users.loading}
          noItemsViewSlot={noItems}
          hover
          striped
          scopedSlots={{
            no: (item: any) => <td className="align-middle">{item.no}</td>,
            first_name: (item: any) => (
              <td className="align-middle" style={{ textAlign: 'left', height: 60 }}>
                {item.first_name}
              </td>
            ),
            last_name: (item: any) => (
              <td className="align-middle" style={{ textAlign: 'left' }}>
                {item.last_name}
              </td>
            ),
            email: (item: any) => (
              <td className="align-middle" style={{ textAlign: 'left' }}>
                {item.email}
              </td>
            ),
            gender: (item: any) => <td className="align-middle">{mappingGender[item.gender]}</td>,
            birth_date: (item: any) => (
              <td className="align-middle">
                {item.birth_date ? formatDate(item.birth_date) : <div style={{ marginLeft: '25%' }}>-</div>}
              </td>
            ),
            feed_back: (item: any) => (
              <td className="align-middle">
                {item.feed_back ? (
                  <div>
                    <StarRatingFloating rating={item.feed_back} size="sm" />
                    <div
                      className="link"
                      style={{ fontSize: 12 }}
                      onClick={() =>
                        setModalFeedbacks({
                          show: true,
                          nurseId: item.id,
                          nurseName: item.first_name + ' ' + item.last_name,
                          nurseThumbnail: '',
                          nurseRating: item.feed_back,
                        })
                      }
                    >
                      View detail
                    </div>
                  </div>
                ) : (
                  <div style={{ marginLeft: '25%' }}>-</div>
                )}
              </td>
            ),
            verify_email: (item: any) => <td className="align-middle">{item.verify_email}</td>,
            status_id: (item: any) => (
              <td className="align-middle">
                <div className="d-flex align-items-center">
                  <CBadge className="status--style--data--table">{statuses[item.status_id]}</CBadge>
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'right',
                      fontSize: 15,
                      visibility: paramType === 'nurse' && item.status_id !== 4 ? 'visible' : 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleShowDocuments(item)}
                  >
                    <i className="fas fa-caret-square-down" />
                  </div>
                </div>
              </td>
            ),
            action: (item: any) => (
              <td className="py-2 align-middle">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  style={{
                    marginRight: 10,
                    visibility: isAdmin || item.type !== 'admin' ? 'hidden' : 'visible',
                  }}
                  onClick={() => setPopupResetData({ show: true, email: item.email, userId: item.id })}
                >
                  <i className="fas fa-sync-alt"> </i>
                </CButton>
                <CButton
                  disabled={item.verify_email === 'Inactive'}
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    setUpdateUserData({ show: true, initialValues: item });
                  }}
                >
                  <i className="fas fa-pencil-alt"> </i>
                </CButton>
              </td>
            ),
          }}
        />
      </div>
      {pagination(users.totalPages, users.page, pageChange, users.total)}
    </div>
  );
};

export default Users;
