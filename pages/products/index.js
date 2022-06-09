import Link from 'next/link'; 
import homeStyles from '../../styles/Home.module.css';

const Products = () => {
	return (
		<div className={homeStyles.container}>
			<Link href='products/covid-test-kit'>Covid Test Kit</Link>
			<br/>
			<Link href='products/sunscreen'>Sun Screen</Link>
			<br/>
			<Link href='products/theragun'>Theragun</Link>
			<br/>
		</div>
	)
}

export default Products;