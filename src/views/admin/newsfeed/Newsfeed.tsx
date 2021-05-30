import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { CDataTable, CPagination, CButton } from '@coreui/react';
import moment from 'moment';
import { ConfirmPopup, ConfirmPopupPassword, DatePicker } from '../../../components';
import Search from '../../../components/search/Search';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { pagination } from '../../../extensions';

const fields = [
  { key: 'no', _style: { width: '15%', paddingLeft: 20 } },
  { key: 'name', label: 'Category name', _style: { width: '30%' } },
  { key: 'created_date', _style: { width: '15%' } },
  { key: 'top_category', _style: { width: '15%', textAlign: 'center' } },
  { key: 'action', _style: { width: '15%', textAlign: 'center' } },
];

type CategoryDataType = {
  no: number;
  id: string;
  name: string;
  created_date: number;
  type_key: 'top_topic' | null;
};

type CategoriesDataType = {
  data: CategoryDataType[];
  total: number;
  totalPages: number;
  loading: boolean;
};

const pageSize = 10;

const Newsfeed: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const query = new URLSearchParams(props.location?.search);
  const page = Math.max(Number(query.get('page')) || 1, 1);
  const [topCategory, setTopCategory] = useState(false);
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [searchName, setSearchName] = useState('');

  const [categories, setCategories] = useState<CategoriesDataType>({
    data: [],
    total: 0,
    totalPages: 0,
    loading: true,
  });
  const [popupDeleteCategory, setPopupDeleteCategory] = useState({ show: false, id: '', name: '' });
  const [popupDeleteCategory2, setPopupDeleteCategory2] = useState({ show: false, id: '', name: '' });

  const getCategories = (newPage: number, searchName: string) => {
    setCategories({ ...categories, loading: true });
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetNewsfeedCategories(
          newPage,
          searchName,
          topCategory,
          fromDate ? fromDate.getTime() / 1000 : null,
          toDate ? toDate.getTime() / 1000 + 86399 : null,
        ),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setCategories({
            data: data.categories.map((item: any, index: number) => {
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

  const pageChange = (newPage: number) => {
    if (page !== newPage) {
      history.push(`?page=${newPage}`);
      getCategories(newPage, searchName);
    }
  };

  useEffect(() => {
    getCategories(page, searchName);
  }, [fromDate, toDate, topCategory]);

  const handleChangeCheckbox = (item: CategoryDataType) => {
    setCategories({ ...categories, loading: true });
    callApi({ method: 'put', api: config.rest.adminDeleteNewsfeedCategory(item.id) }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        getCategories(page, searchName);
      }
    });
  };

  let noItems = <div />;

  if (!categories.loading) {
    if (!categories.total) noItems = <div>No items found</div>;
  }

  const handleDeleteCategory = (id: string, password: string) => {
    setPopupDeleteCategory({ show: false, id: '', name: '' });
    setCategories({ ...categories, loading: true });
    callApi({ method: 'post', api: config.rest.confirmPassword(), body: { password } }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        callApi({ method: 'delete', api: config.rest.adminDeleteNewsfeedCategory(id) }, (response: any) => {
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
      <ConfirmPopup
        isVisible={popupDeleteCategory.show}
        title="Delete Category"
        content={`Are you sure to delete the category "${popupDeleteCategory.name}"`}
        leftButtonText="No"
        rightButtonText="Yes"
        leftButtonOnPress={() => setPopupDeleteCategory({ show: false, id: '', name: '' })}
        rightButtonOnPress={() => {
          setPopupDeleteCategory({ show: false, id: '', name: '' });
          setPopupDeleteCategory2({ show: true, id: popupDeleteCategory.id, name: popupDeleteCategory.name });
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
        <h2>All Categories</h2>
        <div className="d-flex align-items-center mt-4 mb-5">
          <Search
            className="mr-5"
            searchName={searchName}
            setSearchName={setSearchName}
            searchEmpty={true}
            callbackSearch={(searchName: string) => getCategories(1, searchName)}
          />
          Filter by top category
          <input
            style={{ width: 20, height: 20, marginLeft: 20, marginRight: 50 }}
            type="checkbox"
            checked={topCategory}
            onChange={() => setTopCategory(!topCategory)}
          />
          <div>From date:</div>
          <div>
            <DatePicker maxDate={toDate || new Date()} date={fromDate} setDate={setFromDate} />
          </div>
          <div>To date:</div>
          <div>
            <DatePicker minDate={fromDate} date={toDate} setDate={setToDate} />
          </div>
        </div>
      </div>
      <div style={{ minHeight: '65vh' }}>
        <CDataTable
          items={categories.data}
          fields={fields}
          loading={categories.loading}
          noItemsViewSlot={noItems}
          hover
          striped
          scopedSlots={{
            no: (item: CategoryDataType) => (
              <td className="align-middle" style={{ paddingLeft: 20 }}>
                {item.no}
              </td>
            ),
            name: (item: CategoryDataType) => <td className="align-middle">{item.name}</td>,
            created_date: (item: CategoryDataType) => (
              <td className="align-middle">{moment(item.created_date * 1000).format('DD/MM/YYYY')}</td>
            ),
            top_category: (item: CategoryDataType) => (
              <td className="align-middle" style={{ textAlign: 'center' }}>
                <input
                  style={{ width: 20, height: 20 }}
                  checked={item.type_key === 'top_topic'}
                  type="checkbox"
                  onChange={() => handleChangeCheckbox(item)}
                />
              </td>
            ),
            action: (item: any) => (
              <td className="align-middle" style={{ textAlign: 'center' }}>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  style={{
                    marginRight: 10,
                  }}
                  onClick={() => history.push(`/admin/newsfeed/${item.id}`)}
                >
                  <i className="fas fa-eye"> </i>
                </CButton>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => setPopupDeleteCategory({ show: true, id: item.id, name: item.name })}
                >
                  <i className="fas fa-trash-alt"> </i>
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

export default Newsfeed;
