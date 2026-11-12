import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import {
  collectedBefore,
  demoInvoice,
  paidInvoices,
  paymentMethods,
} from './demo.ts';
import styles from './PaymentDemo.module.css';

type Status = 'due' | 'processing' | 'paid';

const usd = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

const travelMs = 1100;
const countUpMs = 900;

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const PaymentDemo = () => {
  const [status, setStatus] = useState<Status>('due');
  const [method, setMethod] = useState(paymentMethods[0].value);
  const [collected, setCollected] = useState(collectedBefore);
  const [tried, setTried] = useState(false);
  const timeout = useRef(0);
  const frame = useRef(0);

  useEffect(
    () => () => {
      window.clearTimeout(timeout.current);
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const countUp = (from: number, to: number) => {
    if (reducedMotion()) {
      setCollected(to);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / countUpMs, 1);
      setCollected(from + (to - from) * (1 - (1 - progress) ** 3));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const pay = () => {
    setTried(true);
    setStatus('processing');
    timeout.current = window.setTimeout(
      () => {
        setStatus('paid');
        countUp(collectedBefore, collectedBefore + demoInvoice.amount);
      },
      reducedMotion() ? 0 : travelMs,
    );
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    setStatus('due');
    setCollected(collectedBefore);
  };

  const handleButtonClick = () => {
    if (status === 'due') pay();
    if (status === 'paid') reset();
  };

  const paid = status === 'paid';
  const amount = usd.format(demoInvoice.amount);
  const buttonLabel = {
    due: `Pay ${amount}`,
    paid: 'Run it again',
    processing: 'Processing payment…',
  }[status];

  return (
    <div className={styles.demo} data-status={status}>
      <section aria-label='Client' className={styles.client}>
        <div className={styles.phone}>
          <Typography component='p' variant='h6'>
            {demoInvoice.firm}
          </Typography>
          <Typography variant='body2'>
            Invoice {demoInvoice.id}
          </Typography>
          <Typography className={styles.amount} component='p' variant='h4'>
            {amount}
          </Typography>

          <div className={styles.swap}>
            <FormControl
              className={classNames(styles.methods, { [styles.hidden]: paid })}
              disabled={status !== 'due'}
            >
              <FormLabel id='pay-with'>Pay with</FormLabel>
              <RadioGroup
                aria-labelledby='pay-with'
                name='pay-with'
                onChange={(event) => setMethod(event.target.value)}
                value={method}
              >
                {paymentMethods.map(({ label, value }) => (
                  <FormControlLabel
                    control={<Radio size='small' />}
                    key={value}
                    label={label}
                    value={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div
              className={classNames(styles.receipt, {
                [styles.hidden]: !paid,
              })}
            >
              <CheckCircleIcon aria-hidden className={styles.receiptIcon} />
              <Typography variant='body2'>
                Paid. A receipt is on its way to your email.
              </Typography>
            </div>
          </div>

          <Button
            aria-describedby='pay-hint'
            aria-disabled={status === 'processing'}
            className={classNames(styles.payButton, {
              [styles.payButtonHint]: !tried,
            })}
            fullWidth
            onClick={handleButtonClick}
            size='large'
            variant={paid ? 'outlined' : 'contained'}
          >
            {buttonLabel}
          </Button>
          <Typography className={styles.secure} variant='caption'>
            <LockIcon aria-hidden fontSize='inherit' />
            Secure checkout
          </Typography>
        </div>
      </section>

      <Typography className={styles.hint} id='pay-hint' variant='body2'>
        Pay the invoice to see both sides update.
      </Typography>

      <div aria-hidden className={styles.connector}>
        <span className={styles.token}>$</span>
      </div>

      <section aria-label='You' className={styles.firm}>
        <div className={styles.panel}>
          <div className={styles.totals}>
            <Typography variant='body2'>Collected</Typography>
            <Typography className={styles.total} component='p' variant='h4'>
              {usd.format(collected)}
            </Typography>
          </div>
          <table className={styles.table}>
            <caption className={styles.visuallyHidden}>Recent invoices</caption>
            <thead className={styles.visuallyHidden}>
              <tr>
                <th scope='col'>Client</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classNames({ [styles.justPaid]: paid })}>
                <td>
                  <Typography component='span' variant='body2'>
                    {demoInvoice.client}
                  </Typography>
                </td>
                <td className={styles.money}>
                  <Typography component='span' variant='body2'>
                    {amount}
                  </Typography>
                </td>
                <td>
                  <Typography
                    className={classNames(styles.status, {
                      [styles.statusPaid]: paid,
                    })}
                    component='span'
                    variant='caption'
                  >
                    {paid && <CheckCircleIcon aria-hidden fontSize='inherit' />}
                    {paid ? 'Paid' : 'Awaiting'}
                  </Typography>
                </td>
              </tr>
              {paidInvoices.map(({ amount: paidAmount, client, id }) => (
                <tr key={id}>
                  <td>
                    <Typography component='span' variant='body2'>
                      {client}
                    </Typography>
                  </td>
                  <td className={styles.money}>
                    <Typography component='span' variant='body2'>
                      {usd.format(paidAmount)}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      className={classNames(styles.status, styles.statusPaid)}
                      component='span'
                      variant='caption'
                    >
                      <CheckCircleIcon aria-hidden fontSize='inherit' />
                      Paid
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className={styles.visuallyHidden} role='status'>
        {paid &&
          `Payment received. Invoice ${demoInvoice.id} now shows as paid. Total collected is ${usd.format(collectedBefore + demoInvoice.amount)}.`}
      </p>
    </div>
  );
};
