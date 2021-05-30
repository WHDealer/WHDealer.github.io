import React, { useEffect, useState } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import Article from './Article';
import { useDispatch } from 'react-redux';
import Frame from '../mobility/Frame';
import { Waypoint } from 'react-waypoint';
import { loadingSmall } from '../../../extensions';
import { HBModal } from '../../../hbBaseClass';

const pageSize = 18;

interface Props {
  show: boolean;
  handleClose: any;
  category: { id: string; name: string };
  setArticlesParent: any;
}

const ModalArticles: React.FC<Props> = (props) => {
  const { show, handleClose, category, setArticlesParent } = props;

  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [articles, setArticles] = useState<any>({ data: [], loading: true, full: false, page: 0, total: 0 });

  const getAllArticles = (page: number) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getNewsfeedArticlesById(category.id, pageSize, page),
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setArticles((articles: any) => {
            return {
              data: page === 1 ? data.articles : [...articles.data, ...data.articles],
              full: data.articles.length < pageSize,
              loading: false,
              page: page,
              total: data.total,
            };
          });
        }
      },
    );
  };

  const loadMoreArticles = () => {
    if (articles.loading || articles.full) return;
    setArticles({ ...articles, loading: true });
    getAllArticles(articles.page + 1);
  };

  useEffect(() => {
    if (!show) return;

    setArticles({ ...articles, data: [], loading: true });
    getAllArticles(1);
  }, [show]);

  return (
    <HBModal
      style={{ backgroundColor: 'var(--petrol-5', maxHeight: '92vh' }}
      show={show}
      onClose={handleClose}
      centered
      size="xl"
      closeOnBackdrop={false}
      // closeBtn
    >
      <div>
        <div style={{ background: 'var(--petrol-5)', paddingBottom: 16 }}>
          <div className="d-flex justify-content-center" style={{ marginBottom: 10 }}>
            <div
              onClick={handleClose}
              style={{ fontSize: 28, cursor: 'pointer', fontWeight: 500, position: 'absolute', left: 12, top: 12 }}
            >
              <i className="hb-icon-arrow-left" />
            </div>
            <h1 style={{ color: 'var(--nightblue-100)', textAlign: 'center', paddingTop: 6 }}>{category.name}</h1>
          </div>
          {articles.data.length > 0 && <div className="hb-card-header">{articles.total} Artikel</div>}
        </div>
        {!articles.loading && articles.data.length === 0 && <div className="hb-no-items">Keine artikel</div>}
        <div className="hb-scroll" style={{ maxHeight: 'calc(85vh - 140px)', marginRight: -10, paddingRight: 10 }}>
          {articles.data.length > 0 && (
            <div className="row">
              {articles.data.map((article: any, index: number) => (
                <Article
                  setArticles={setArticles}
                  setArticlesParent={setArticlesParent}
                  {...article}
                  index={index}
                  key={index}
                  mini={true}
                  categoryName={category.name}
                />
              ))}
            </div>
          )}
          {articles.loading && <Frame size="large" render={loadingSmall} />}
          <Waypoint onEnter={loadMoreArticles} />
          <div style={{ height: 20 }}></div>
        </div>
      </div>
    </HBModal>
  );
};

export default ModalArticles;
