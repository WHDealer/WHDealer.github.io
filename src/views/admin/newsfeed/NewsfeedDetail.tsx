import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { CDataTable, CPagination, CButton } from '@coreui/react';
import moment from 'moment';
import { ConfirmPopup, DatePicker } from '../../../components';
import Search from '../../../components/search/Search';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import config from '../../../config';
import ModalCreateArticle from './ModalCreateArticle';
import { pagination } from '../../../extensions';

const fields = [
  { key: 'no', _style: { width: '4%' } },
  { key: 'title', _style: { width: '24%' } },
  { key: 'summary', _style: { width: '30%' } },
  { key: 'source', label: 'Link', _style: { width: '24%' } },
  { key: 'created_date', _style: { width: '10%' } },
  { key: 'action', _style: { width: '10%' } },
];

type ArticleDataType = {
  no: number;
  id: string;
  title: string;
  summary: string;
  type: string;
  created_date: number;
  source: string;
};

type CategoryDataType = {
  data: ArticleDataType[];
  total: number;
  totalPages: number;
  loading: boolean;
  name: string;
};

const pageSize = 10;

const defaultModal = { show: false, id: '', name: '' };

const NewsfeedDetail: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: any) => dispatch(callApiAction(payload, callback));
  const params: any = props.match?.params;
  const categoryId = params?.id;
  const query = new URLSearchParams(props.location?.search);
  const page = Math.max(Number(query.get('page')) || 1, 1);
  const [searchName, setSearchName] = useState('');
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const today = new Date();

  const [articles, setArticles] = useState<CategoryDataType>({
    data: [],
    total: 0,
    totalPages: 0,
    loading: true,
    name: '',
  });
  const [popupDelete, setPopupDelete] = useState({ show: false, id: '' });
  const [modal, setModal] = useState(defaultModal);

  const getArticles = (newPage: number, searchName: string) => {
    setArticles({ ...articles, loading: true });
    callApi(
      {
        method: 'get',
        api: config.rest.adminGetNewsfeedArticles(
          categoryId,
          newPage,
          searchName,
          fromDate ? fromDate.getTime() / 1000 : null,
          toDate ? toDate.getTime() / 1000 + 86399 : null,
        ),
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setArticles({
            data: data.articles.map((item: any, index: number) => {
              return { ...item, no: index + 1 + pageSize * (newPage - 1) };
            }),
            total: data.total,
            totalPages: Math.ceil(data.total / pageSize),
            loading: false,
            name: data.category_name,
          });
          if (page !== newPage) history.push(`?page=${newPage}`);
        } else {
          setArticles((articles: CategoryDataType) => {
            return { ...articles, loading: false };
          });
        }
      },
    );
  };

  const handleDelete = (id: string) => {
    setPopupDelete({ show: false, id: '' });
    setArticles({ ...articles, loading: true });
    callApi({ method: 'delete', api: config.rest.adminDeleteNewsfeedArticle(categoryId, id) }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        getArticles(page, searchName);
      }
    });
  };

  const pageChange = (newPage: number) => {
    if (page !== newPage) {
      history.push(`?page=${newPage}`);
      getArticles(newPage, searchName);
    }
  };

  useEffect(() => {
    getArticles(page, searchName);
  }, [fromDate, toDate]);

  let noItems = <div />;

  if (!articles.loading) {
    if (!articles.total) noItems = <div>No items found</div>;
  }

  return (
    <div>
      <ModalCreateArticle
        {...modal}
        handleClose={() => setModal(defaultModal)}
        setArticles={setArticles}
        page={page}
        pageSize={pageSize}
      />
      <ConfirmPopup
        isVisible={popupDelete.show}
        title="Delete Article"
        content="Are you sure to delete this article?"
        leftButtonText="No"
        rightButtonText="Yes"
        leftButtonOnPress={() => setPopupDelete({ show: false, id: '' })}
        rightButtonOnPress={() => handleDelete(popupDelete.id)}
      />

      <Link className="pl-5 py-2 size-1" to="/admin/newsfeed">
        All Categories
      </Link>
      <span className="size-0 pl-2">&gt; {articles.name}</span>
      <div className="px-5 mt-3">
        <div className="d-flex align-items-center justify-content-between mt-4 mb-5">
          <div className="d-flex align-items-center">
            <Search
              className="mr-5"
              searchName={searchName}
              setSearchName={setSearchName}
              searchEmpty={true}
              callbackSearch={(searchName: string) => getArticles(1, searchName)}
            />
            <div>From date:</div>
            <div>
              <DatePicker maxDate={toDate} date={fromDate} setDate={setFromDate} />
            </div>
            <div>To date:</div>
            <div>
              <DatePicker minDate={fromDate} date={toDate} setDate={setToDate} />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-primary"
              onClick={() => setModal({ show: true, id: categoryId, name: articles.name })}
              disabled={articles.loading && articles.data.length === 0}
            >
              Create new article
            </button>
          </div>
        </div>
        <div style={{ minHeight: '65vh' }}>
          <CDataTable
            items={articles.data}
            fields={fields}
            loading={articles.loading}
            noItemsViewSlot={noItems}
            hover
            striped
            scopedSlots={{
              no: (item: ArticleDataType) => <td className="align-middle">{item.no}</td>,
              title: (item: ArticleDataType) => (
                <td className="align-middle" title={item.summary?.length > 80 ? item.summary : ''}>
                  {item.title.length > 80 ? item.title?.substring(0, 80 - 3) + '...' : item?.title}
                </td>
              ),
              summary: (item: ArticleDataType) => (
                <td
                  style={{ height: 100 }}
                  className="align-middle"
                  title={item.summary?.length > 80 ? item.summary : ''}
                >
                  {item.summary.length > 80 ? item.summary?.substring(0, 80 - 3) + '...' : item?.summary}
                </td>
              ),
              type: (item: ArticleDataType) => <td className="align-middle">{item.type}</td>,
              source: (item: ArticleDataType) => (
                <td className="align-middle">
                  <a target="_blank" href={item.source}>
                    {item.source.length > 80 ? item.source?.substring(0, 80 - 3) + '...' : item?.source}
                  </a>
                </td>
              ),
              created_date: (item: ArticleDataType) => (
                <td className="align-middle">
                  {!item.created_date ? '-' : moment(item.created_date * 1000).format('DD/MM/YYYY')}
                </td>
              ),
              action: (item: ArticleDataType) => (
                <td className="align-middle">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    style={{
                      marginRight: 10,
                    }}
                    onClick={() => setPopupDelete({ show: true, id: item.id })}
                  >
                    <i className="fas fa-trash-alt"> </i>
                  </CButton>
                </td>
              ),
            }}
          />
        </div>
        {pagination(articles.totalPages, page, pageChange, articles.total)}
      </div>
    </div>
  );
};

export default NewsfeedDetail;
