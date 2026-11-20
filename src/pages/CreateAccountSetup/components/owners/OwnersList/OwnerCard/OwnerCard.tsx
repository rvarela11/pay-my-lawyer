import { Card, CardActions, CardHeader } from '@mui/material';
import { OWNER_LABELS } from '../ownerLabels.ts';
import { OwnershipBar } from '../OwnershipBar/OwnershipBar.tsx';
import type { OwnerRow } from '../toOwnerRows.ts';
import { OwnerActions } from './OwnerActions/OwnerActions.tsx';
import styles from './OwnerCard.module.css';
import { OwnerDetail } from './OwnerDetail/OwnerDetail.tsx';

type Props = {
  onEdit: (row: OwnerRow) => void;
  onRemove: (row: OwnerRow) => void;
  row: OwnerRow;
};

// One owner: name and ownership on top, title and Bar Card # below, then the actions and a bar as wide as their share.
export const OwnerCard = ({ onEdit, onRemove, row }: Props) => (
  <Card className={styles.card} component='li' variant='outlined'>
    <CardHeader
      action={
        <dl className={styles.ownership}>
          <OwnerDetail
            hideLabel
            label={OWNER_LABELS.ownership}
            value={`${row.ownership}%`}
            variant='subtitle1'
          />
        </dl>
      }
      className={styles.header}
      slotProps={{
        action: { className: styles.action },
        content: { className: styles.content },
        subheader: { component: 'dl', variant: 'body2' },
        title: {
          className: styles.name,
          component: 'p',
          title: row.name,
          variant: 'subtitle1',
        },
      }}
      subheader={
        <>
          <OwnerDetail hideLabel label={OWNER_LABELS.title} value={row.title} />
          <OwnerDetail label={OWNER_LABELS.barNumber} value={row.barNumber} />
        </>
      }
      title={row.name}
    />
    <CardActions className={styles.actions} disableSpacing>
      <OwnerActions
        isApplicant={!row.owner}
        name={row.name}
        onEdit={() => onEdit(row)}
        onRemove={() => onRemove(row)}
      />
    </CardActions>
    <OwnershipBar value={row.ownership} />
  </Card>
);
