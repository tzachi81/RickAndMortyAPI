import styles from './header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1>Rick and Morty Characters</h1>;
    </div>
  )
}

export default Header
