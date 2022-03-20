from marshmallow import Schema, fields

class UserSchema(Schema):
    _id = fields.Str()
    name = fields.Str()
    surname = fields.Str()
    email = fields.Email()
    password = fields.Str()
