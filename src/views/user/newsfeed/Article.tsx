import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { timestampToDatetime } from '../../../utils';

interface Props {
  index: number;
  id: string;
  image: string;
  created_date: number;
  title: string;
  summary: string;
  source: string;
  setArticles: (article: any) => void;
  setArticlesParent: (article: any) => void;
  status: boolean;
  categories: { id: string; name: string }[];
  mini: boolean;
  categoryName?: string;
  setModal?: any;
}

const Article: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const {
    index,
    id,
    image,
    created_date,
    title,
    summary,
    source,
    setArticles,
    setArticlesParent,
    status,
    categories,
    mini,
    categoryName,
    setModal,
  } = props;

  const changeFavorite = () => {
    setArticles((articles: any) => {
      let newArticles = [...articles.data];
      // const index = newArticles.findIndex((item) => item.id === id);
      newArticles[index].status = !status;
      return { ...articles, data: newArticles };
    });
    setArticlesParent &&
      setArticlesParent((articles: any) => {
        let newArticles = [...articles.data];
        const newIndex = newArticles.findIndex((item) => item.id === id);
        if (newIndex === -1) return articles;
        newArticles[newIndex].status = !status;
        return { ...articles, data: newArticles };
      });

    callApi(
      {
        method: status ? 'delete' : 'post',
        api: config.rest.newsfeedFavoriteSetting(id),
        // loading: true,
      },
      (response) => {
        const status1 = response.status;
        if (status1 === SUCCESS) {
        }
      },
    );
  };

  const handleShowModal = (category: { id: string; name: string }) => {
    if (categoryName) return;
    setModal({ show: true, category });
  };

  return (
    <div className="col-lg-4 col-md-6 hb-card-item">
      {!mini ? (
        <>
          <a
            href={source}
            target="_blank"
            style={{
              overflow: 'hidden',
              width: '100%',
              display: 'block',
              borderRadius: '32px 32px 0 0',
              height: 245,
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
            }}
          />
          <div
            style={{
              backgroundColor: 'white',
              padding: '18px 20px 20px 20px',
              borderRadius: '0 0 30px 30px',
              height: 213,
            }}
          >
            <div className="d-flex justify-content-between">
              <div className="hb-article-time">
                <i className="hb-icon-calendar-event" />
                <span className="hb-article-time-text">{timestampToDatetime(created_date)}</span>
              </div>
              <div className="hb-save" onClick={changeFavorite}>
                <i className={`${status ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
              </div>
            </div>
            <a className="hb-card-title" href={source} target="_blank">
              {title}
            </a>
            <p className="hb-card-summary">{summary}</p>
            <div className="d-flex" style={{ marginTop: 10 }}>
              {categories.slice(0, 3).map((item) => (
                <div key={item.id} className="hb-card-keyword" onClick={() => handleShowModal(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 32,
            height: 124,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <a
              href={source}
              target="_blank"
              style={{
                overflow: 'hidden',
                display: 'block',
                borderRadius: 20,
                width: 94,
                height: 94,
                backgroundImage: `url("${image}")`,
                backgroundSize: 'cover',
              }}
            />
          </div>
          <div
            style={{
              marginLeft: 10,
              marginRight: 28,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <a className="hb-card-title-mini" href={source} target="_blank">
              {title}
            </a>
            <div className="d-flex justify-content-between">
              <div>
                {categories.length > 0 && (
                  <div
                    className={`hb-card-keyword${categoryName ? ' disabled' : ''}`}
                    onClick={() => handleShowModal(categories[0])}
                  >
                    {categoryName || categories[0].name}
                  </div>
                )}
              </div>
              <div className="hb-save" onClick={changeFavorite}>
                <i className={`${status ? 'hb-icon-heart-s' : 'hb-icon-heart-r'}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
