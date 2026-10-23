import { useState } from 'react';
import { site } from '../../data/site';
import { mailtoFor, saveEnquiry } from '../../lib/enquiries';
import Icon from '../ui/Icon';
import './EnquiryForm.css';

const EMPTY = { name: '', email: '', phone: '', message: '' };

/**
 * Reusable enquiry form. Used on the contact page and inside the
 * schedule-a-viewing dialog on a property page.
 */
export default function EnquiryForm({
  intent = 'general',
  propertyId = null,
  propertyTitle = null,
  recipient = site.email,
  subject,
  compact = false,
  messagePlaceholder = 'Tell us what you are looking for, and any questions you have.'
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const set = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!values.email.trim()) next.email = 'An email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'That email address does not look right.';
    if (!values.message.trim()) next.message = 'Add a short message so we can help.';
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    const entry = saveEnquiry({
      intent,
      propertyId,
      propertyTitle,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      subject:
        subject ?? (propertyTitle ? `Enquiry — ${propertyTitle}` : 'General enquiry from the website')
    });

    setSubmitted(entry);
    setValues(EMPTY);
  };

  if (submitted) {
    return (
      <div className="enquiry__done" role="status">
        <span className="enquiry__done-icon" aria-hidden="true">
          <Icon name="check-circle" size={26} />
        </span>
        <h3>Thank you, {submitted.name.split(' ')[0]}</h3>
        <p>
          Your enquiry has been logged and a senior adviser will reply within one working day.
          {submitted.phone ? ` We may call you on ${submitted.phone}.` : ''}
        </p>
        <div className="enquiry__done-actions">
          <a className="btn" href={mailtoFor(submitted, recipient)}>
            <Icon name="mail" size={16} />
            <span>Send a copy by email</span>
          </a>
          <button type="button" className="btn btn--outline" onClick={() => setSubmitted(null)}>
            <span>Send another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`enquiry ${compact ? 'enquiry--compact' : ''}`.trim()} onSubmit={onSubmit} noValidate>
      <div className="enquiry__field">
        <label htmlFor="enquiry-name">Full name</label>
        <input
          id="enquiry-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
        />
        {errors.name ? (
          <p className="enquiry__error" id="enquiry-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="enquiry__field">
        <label htmlFor="enquiry-email">Email</label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
        />
        {errors.email ? (
          <p className="enquiry__error" id="enquiry-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="enquiry__field">
        <label htmlFor="enquiry-phone">
          Phone <span className="enquiry__optional">(optional)</span>
        </label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set('phone')}
        />
      </div>

      <div className="enquiry__field enquiry__field--wide">
        <label htmlFor="enquiry-message">Message</label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={compact ? 3 : 5}
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
        />
        {errors.message ? (
          <p className="enquiry__error" id="enquiry-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="enquiry__actions">
        <button type="submit" className="btn btn--lg">
          <span>{intent === 'viewing' ? 'Request viewing' : 'Send enquiry'}</span>
          <Icon name="arrow-right" size={17} className="btn__icon" />
        </button>
        <p className="enquiry__note">
          We reply within one working day. Your details are never shared.
        </p>
      </div>
    </form>
  );
}
