import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { CDataTable, CPagination, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ModalCreateCategory from './ModalCreateCategory';
import { ConfirmPopup, ConfirmPopupPassword, DatePicker } from '../../../components';
import Search from '../../../components/search/Search';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { pagination } from '../../../extensions';

const fields = [
  'no',
  { key: 'title', label: 'Category name' },
  'description',
  'created_date',
  { key: 'total_video', label: 'Number Of Videos' },
  'action',
];

const initialValuesCreate = {
  title: '',
  description: '',
};

type CategoryDataType = {
  no: number;
  id: string;
  title: string;
  description: string;
  created_date: number;
  total_video: number;
};

type CategoriesDataType = {
  data: CategoryDataType[];
  total: number;
  totalPages: number;
  loading: boolean;
};

const pageSize = 10;

const Categories: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));

  const history = useHistory();
  const query = new URLSearchParams(props.location.search);
  const page = Math.max(Number(query.get('page')) || 1, 1);

  const [categories, setCategories] = useState<CategoriesDataType>({
    data: [],
    total: 0,
    totalPages: 0,
    loading: true,
  });
  const [createCategoryData, setCreateCategoryData] = useState({ show: false, initialValues: initialValuesCreate });
  const [popupDeleteCategory, setPopupDeleteCategory] = useState({ show: false, id: '', name: '' });
  const [popupDeleteCategory2, setPopupDeleteCategory2] = useState({ show: false, id: '', name: '' });
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [searchName, setSearchName] = useState('');

  const pageChange = (newPage: number) => {
    if (page !== newPage) {
      history.push(`?page=${newPage}`);
      getCategories(newPage, searchName);
    }
  };

  useEffect(() => {
    getCategories(page, searchName);
  }, [fromDate, toDate]);

  let noItems = <div />;

  if (!categories.loading) {
    if (!categories.total) noItems = <div>{t('no-items-found')}</div>;
  }

  const getCategories = (newPage: number, searchName: string) => {
    setCategories({ ...categories, loading: true });
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetMobilityCategories(
          newPage,
          searchName,
          fromDate ? fromDate.getTime() / 1000 : null,
          toDate ? toDate.getTime() / 1000 + 86399 : null,
        ),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setCategories({
            data: data.data.map((item: any, index: number) => {
              return { ...item, no: index + 1 + pageSize * (newPage - 1) };
            }),
            total: data.total,
            totalPages: Math.ceil(data.total / pageSize),
            loading: false,
          });
          if (page !== newPage) history.push(`?page=${newPage}`);
        } else {
          setCategories((categories: any) => {
            return { ...categories, loading: false };
          });
        }
      },
    );
  };

  const handleDeleteCategory = (id: string, password: string) => {
    setPopupDeleteCategory({ show: false, id: '', name: '' });
    setCategories({ ...categories, loading: true });
    callApi({ method: 'post', api: config.rest.confirmPassword(), body: { password } }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        callApi({ method: 'delete', api: config.rest.adminDeleteMobilityCategory(id) }, (response: any) => {
          const { status } = response;
          if (status === SUCCESS) {
            getCategories(page, searchName);
          } else
            setCategories((categories: any) => {
              return { ...categories, loading: false };
            });
        });
      } else
        setCategories((categories: any) => {
          return { ...categories, loading: false };
        });
    });
  };

  return (
    <div style={{ width: '90%', margin: '10px auto' }}>
      <ModalCreateCategory
        callApi={callApi}
        initialValues={createCategoryData.initialValues}
        show={createCategoryData.show}
        handleClose={() => setCreateCategoryData({ show: false, initialValues: initialValuesCreate })}
        searchCategories={() => getCategories(page, searchName)}
      />
      <ConfirmPopup
        isVisible={popupDeleteCategory.show}
        title="Delete Category"
        content={`Are you sure to delete the category ${popupDeleteCategory.name}`}
        leftButtonText="No"
        rightButtonText="Yes"
        leftButtonOnPress={() => setPopupDeleteCategory({ show: false, id: '', name: '' })}
        rightButtonOnPress={() => {
          setPopupDeleteCategory2({ show: true, id: popupDeleteCategory.id, name: popupDeleteCategory.name });
          setPopupDeleteCategory({ show: false, id: '', name: '' });
        }}
      />
      <ConfirmPopupPassword
        isVisible={popupDeleteCategory2.show}
        title="Delete Category"
        leftButtonText="Cancel"
        rightButtonText="Delete"
        content={`Please enter your password to delete category "${popupDeleteCategory2.name}"!`}
        callback={(password: string) => handleDeleteCategory(popupDeleteCategory2.id, password)}
        handleClose={() => setPopupDeleteCategory2({ show: false, id: '', name: '' })}
      />
      <div>
        <h2>Category Management</h2>
        <div className="d-flex align-items-center mt-4" style={{ marginBottom: '2.4rem' }}>
          <Search
            className="mr-5"
            searchName={searchName}
            setSearchName={setSearchName}
            searchEmpty={true}
            callbackSearch={(searchName: string) => getCategories(1, searchName)}
          />
          <div>From date:</div>
          <div>
            <DatePicker maxDate={toDate || new Date()} date={fromDate} setDate={setFromDate} />
          </div>
          <div>To date:</div>
          <div>
            <DatePicker minDate={fromDate} date={toDate} setDate={setToDate} />
          </div>
          <div style={{ textAlign: 'right', flex: 1 }}>
            <CButton
              color="primary"
              onClick={() =>
                setCreateCategoryData({
                  show: true,
                  initialValues: {
                    title: '',
                    description: '',
                  },
                })
              }
            >
              Add new category
            </CButton>
          </div>
        </div>
      </div>
      <div style={{ minHeight: '65vh', textAlign: 'center' }}>
        <CDataTable
          items={categories.data}
          fields={fields}
          loading={categories.loading}
          noItemsViewSlot={noItems}
          hover
          striped
          scopedSlots={{
            title: (item: CategoryDataType) => <td className="align-middle">{item.title}</td>,
            description: (item: CategoryDataType) => (
              <td title={item.description.length > 90 ? item.description : ''} className="align-middle">
                {item.description.length > 90 ? item.description.substring(0, 87) + '...' : item.description}
              </td>
            ),
            created_date: (item: CategoryDataType) => (
              <td className="align-middle">{moment(item.created_date * 1000).format('DD/MM/YYYY')}</td>
            ),
            number_of_videos: (item: CategoryDataType) => <td className="align-middle">{item.total_video}</td>,
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
                  onClick={() => setPopupDeleteCategory({ show: true, id: item.id, name: item.title })}
                >
                  <i className="fas fa-trash-alt"> </i>
                </CButton>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => history.push(`/admin/mobility/categories/${item.id}`)}
                >
                  <i className="fas fa-pencil-alt"> </i>
                </CButton>
              </td>
            ),
          }}
        />
      </div>
      {pagination(categories.totalPages, page, pageChange, categories.total)}
    </div>
  );
};

export default Categories;
