import classNames from 'classnames';
import styles from './Rule.module.css';

type Props = {
  className?: string;
  grow?: boolean;
};

export const Rule = ({ className, grow = false }: Props) => (
  <div
    aria-hidden
    className={classNames(styles.rule, { [styles.grow]: grow }, className)}
  />
);
