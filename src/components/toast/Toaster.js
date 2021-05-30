import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../../store/toasts/actions';
import './Toast.scss';
import Toast from './Toast';

const Toaster = () => {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  return (
    <div className="hb-toaster">
      {toasts.map((toast) => (
        <Toast
          key={toast.key}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onRemove={() => dispatch(removeToast(toast.key))}
        />
      ))}
    </div>
  );
};

export default Toaster;
