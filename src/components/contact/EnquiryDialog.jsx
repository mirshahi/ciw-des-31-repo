import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import EnquiryForm from './EnquiryForm';
import './EnquiryDialog.css';

/** Modal wrapper around EnquiryForm, used by the property CTAs. */
export default function EnquiryDialog({
  open,
  onClose,
  title,
  description,
  intent = 'general',
  propertyId,
  propertyTitle,
  subject,
  recipient
}) {
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    lastFocused.current = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('is-locked');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('is-locked');
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog__panel">
        <div className="dialog__head">
          <div>
            <h2 className="dialog__title" id="enquiry-dialog-title">
              {title}
            </h2>
            {description ? <p className="dialog__text">{description}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="dialog__close"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="dialog__body">
          <EnquiryForm
            intent={intent}
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            subject={subject}
            recipient={recipient}
            compact
            messagePlaceholder={
              intent === 'viewing'
                ? 'Share a couple of dates that suit you and we will confirm.'
                : 'Ask about availability, the area, or anything else.'
            }
          />
        </div>
      </div>
    </div>
  );
}
