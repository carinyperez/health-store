import styles from '../../styles/Product.module.css';
import {useState, useEffect} from 'react';
import imageUrlBuilder from '@sanity/image-url';

export const Product = ({title, body, image}) => {

	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const imgBuilder = imageUrlBuilder({
			projectId : '12xwl09v', 
			dataset: 'production'
		}); 

		setImageUrl(imgBuilder.image(image.asset));
	}, [image])

	return (
		<div> 
			<div className={styles.main}>
				<h1>{title}</h1>
				<p className={styles.body}>{body.en[0].children[0].text}</p>
				{
					imageUrl && <img className={styles.mainImage} src={imageUrl}/>
				}
			</div>
		</div>
	)
}

export const getServerSideProps = async (pageContext) => {
	const pageSlug = pageContext.query.slug; 
	// 404 error
	if(!pageSlug) {
		return {
			notFound: true
		}
	}

	// query sanity for this product using the slug 
	// GraphQL is a query language for API's and GROQ is also a query language but for schema-less JSON documents
	const query = encodeURIComponent(`*[ _type == "product" && slug.current == "${pageSlug}" ]`);
	const url = `https://12xwl09v.api.sanity.io/v1/data/query/production?query=${query}`;

	const product = await fetch(url).then(res => res.json());

	const foundProduct = product.result[0];

	console.log(foundProduct.defaultProductVariant.images[0]);

	if(!product) {
		return {
			notFound: true
		}
	} else { 
		return {
			props: {
				body: foundProduct.body,
				title: foundProduct.title,
				image: foundProduct.defaultProductVariant.images[0],
			}
		}
		
	}
}

export default Product;