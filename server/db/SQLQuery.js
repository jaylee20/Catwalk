/* eslint-disable no-tabs */
const productStyle = `
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
	left join joinedPhotoSku jps
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
`;

const productDetail = `
with feature as (
	select product_id, json_agg(json_build_object('feature', feature, 'value', value)) as features
	from features f
	where product_id = $1
	group by product_id
), product as (
	select *
	from products where id = $1
)
	select p.*, f.features
	from product p
	left join feature f
	on p.id = f.product_id;
`;

const relatedProducts = `
select json_agg(related_product_id) as related
from relatedproducts r
where current_product_id  = $1;
`;

const topFiveProducts = `
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
	OFFSET $1 ROWS
	FETCH NEXT $2 ROWS ONLY;
`;

const deleteProduct = `
delete from products where id = $1;
`;
const deleteStyle = `
delete from styles where id = $1;
`;
const deleteFeature = `
delete from features where id = $1;
`;
const deletePhoto = `
delete from photos where id = $1;
`;
const deleteSku = `
delete from skus where id = $1;
`;
const deleteRelatedProductID = `
delete from relatedproducts where related_product_id = $1;
`;

const characteristicReview = `
with insert_review as (
	insert into
		reviews(id, product_id, rating, date, summary, body, recommend, reviewer_name)
		VALUES((select max(id)+1 from reviews), $1, $2, $3, $4, $5, $6, $7)
	returning id, product_id
), count_of_characteristics as (
	select count(id)
	from "characteristics" c
	where product_id = $1
), max_numbers as (
	select id, row_number() over (PARTITION by 1) as rn from generate_series((select max(id) + 1 from characteristic_reviews), (select (max(id) + (select * from count_of_characteristics))  from characteristic_reviews)) as id
), product_characteristics as (
	select c.id as characteristic_id, ir.id as review_id
	from "characteristics" c
	join insert_review ir
	on c.product_id = ir.product_id
), final_product_characterisitcs as (
	select pc.characteristic_id as characteristic_id, pc.review_id as review_id, tv.result as value, row_number() over (PARTITION by 1) as rn
	from product_characteristics pc
	join temp_reviews tv --temp table with values
	on pc.characteristic_id = tv.characteristic_id
),combined_table as (
	select mn.id, fpc.characteristic_id, fpc.review_id, fpc.value
	from max_numbers mn
	full join final_product_characterisitcs fpc
	on mn.rn = fpc.rn
)
insert into characteristic_reviews(id, characteristic_id, review_id, value)
select * from combined_table
;
`;

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
  deleteRelatedProductID,
  characteristicReview,
};
