class Product:
    def __init__(self, name, brand, price, in_stock, _id = None):
        self._id = _id
        self.name = name
        self.brand = brand
        self.price = price
        self.in_stock = in_stock
