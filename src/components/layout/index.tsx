import Navbar from '../NavBar'
import styles from './layout.module.css'
interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>{children}</main>
    </>
  )
}