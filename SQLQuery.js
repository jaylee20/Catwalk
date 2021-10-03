const productStyle =
`
with sku as (
	select
		styleid,
		json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) as skus
	from skus s
	where styleid in (
	select id
	from styles
	where productid = $1
	)
group by styleid
), photo as (
	select
		styleid,
		json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos
	from photos
	where styleid in (
	select id
	from styles
	where productid = $1
	)
	group by styleid
), joinedPhotoSku as (
	select
		sku.styleid,
		sku.skus,
		p.photos
	from sku
	join photo p
	on sku.styleid = p.styleid
),singleStyle as (
	select * from styles
	where productid = $1
), styleWithPhotoSku as (
	select s.*, jps.skus, jps.photos
	from singleStyle s
	join joinedPhotoSku jps
	on s.id = jps.styleid
), combined as (
	select
		productid,
		json_agg(json_build_object
					(
					'style_id', id,
					'name', name,
					'original_price', original_price,
					'default?', default_style,
					'photos', photos,
					'skus', skus
					)
				) as results
	from styleWithPhotoSku
	group by productid
)
select * from combined;
`

const productDetail =
`
with feature as (
	select product_id, json_agg(json_build_object('feature', feature, 'value', value)) as features
	from features f
	where product_id = $1
	group by product_id
), product as (
	select *
	from products where id = $1
)
	select p.*, f.features from products p
	join feature f
	on p.id = f.product_id;

`

const relatedProducts =
`
select json_agg(related_product_id) as related
from relatedproducts r
where current_product_id  = $1;
`

const topFiveProducts =
`
with feature as (
	select product_id, json_agg(json_build_object('feature', feature, 'value', value)) as features
	from features f
	group by product_id
), product as (
	select *
	from products
)
	select p.*, f.features from products p
	join feature f
	on p.id = f.product_id
	limit 5;
`

const deleteProduct =
`
delete from products where id = $1;
`
const deleteStyle =
`
delete from styles where id = $1;
`
const deleteFeature =
`
delete from features where id = $1;
`
const deletePhoto =
`
delete from photos where id = $1;
`
const deleteSku =
`
delete from skus where id = $1;
`
const deleteRelatedProductID =
`
delete from relatedproducts where related_product_id = $1;
`

module.exports = {
	topFiveProducts,
	productStyle,
	productDetail,
	relatedProducts,
	deleteProduct,
	deleteStyle,
	deleteFeature,
	deletePhoto,
	deleteSku,
	deleteRelatedProductID
};

