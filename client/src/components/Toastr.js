import React, {useMemo} from 'react';
import cx from 'classnames';

import '../style/Toastr.css';

const Toastr = ({
  title,
  message,
  children,
  visibility,
  color = 'info',
  position = 'top-right',
  duration = 3000,
}) => {


  const containerClass = useMemo(
    () =>
      cx('toastr-container', {
        'toastr-tr': position === 'top-right',
        'toastr-tl': position === 'top-left',
        'toastr-tc': position === 'top-center',
        'toastr-br': position === 'bottom-right',
        'toastr-bl': position === 'bottom-left',
        'toastr-bc': position === 'bottom-center',
        'toastr-hidden': !visibility,
      }),
    [position, visibility]
  );

  const colorClass = useMemo(
    () =>
      cx('toastr-content', {
        'toastr-info': color === 'info',
        'toastr-success': color === 'success',
        'toastr-warning': color === 'warning',
        'toastr-error': color === 'error',
      }),
    [color]
  );

  return (
    <React.Fragment>
      <div className={containerClass} style={{display:visibility ? '' : 'none'}}>
        <div className={colorClass}>
          <div className="toast-title">{title}</div>
          <div className="toast-message">{message}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Toastr;
