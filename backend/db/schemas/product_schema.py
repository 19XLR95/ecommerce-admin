from marshmallow import Schema, fields

class ProductSchema(Schema):
    _id = fields.Str()
    name = fields.Str()
    brand = fields.Str()
    price = fields.Float()
    in_stock = fields.Int()
