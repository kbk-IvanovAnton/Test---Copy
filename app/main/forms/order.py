from flask_wtf import FlaskForm
from wtforms import (
    BooleanField,
    DateTimeField,
    FieldList,
    FloatField,
    FormField,
    IntegerField,
    SelectField,
    StringField,
    ValidationError,
)
from wtforms.validators import DataRequired, Optional

from app.admin.models.account_items import AccountItems
from app.admin.models.currencies import Currencies
from app.admin.models.payment_metods import PaymentMethods
from app.admin.models.receipts import Receipts
from app.admin.models.supported_types import SupportedTypes
from app.admin.models.travel import Travel
from app.auth.models.user import User
from app.main.models.locations1 import Locations1


def my_length_check(form, field):
    if len(field.data) == 0:
        raise ValidationError("This field is required.")


class OrderForm(FlaskForm):
    class Meta:
        csrf = False

    name_id = SelectField("User", coerce=int, validators=[DataRequired()])
    order = StringField("Order", validators=[my_length_check])
    order_number = StringField("Order Number", validators=[my_length_check])
    detail_number = StringField("Detail Number", validators=[my_length_check])
    service_number = StringField("Service Number", validators=[my_length_check])
    service_card_number = StringField("Service Card Number", validators=[my_length_check])
    quote_number = StringField("Quote Number", validators=[my_length_check])
    purchase_order_number = StringField("Purchase Order Number", validators=[my_length_check])
    travel_id = SelectField("Travel", coerce=int, validators=[DataRequired()])
    support_type_id = SelectField("Support Type", coerce=int, validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        super(OrderForm, self).__init__(*args, **kwargs)
        self.name_id.choices = [(user.id, user.name) for user in User.query.all()]
        self.name_id.choices.insert(0, (0, ""))
        self.travel_id.choices = [
            (travel.id, travel.travelName) for travel in Travel.query.order_by(Travel.order).all()
        ]
        self.travel_id.choices.insert(0, (0, ""))
        self.support_type_id.choices = [
            (supported_type.id, supported_type.supportedTypeName)
            for supported_type in SupportedTypes.query.order_by(SupportedTypes.order).all()
        ]
        self.support_type_id.choices.insert(0, (0, ""))


class RateForm(FlaskForm):
    class Meta:
        csrf = False

    currency_id = SelectField("Currency", coerce=int, validators=[Optional()], default=1)
    foreign_currency = FloatField("Foreign Currency", validators=[Optional()])
    temporary_payment = FloatField("Temporary Payment", validators=[Optional()])
    remaining_payment = FloatField("Remaining Payment", validators=[Optional()])

    def __init__(self, *args, **kwargs):
        super(RateForm, self).__init__(*args, **kwargs)
        self.currency_id.choices = [
            (currency.id, currency.name) for currency in Currencies.query.all()
        ]
        self.currency_id.choices.insert(0, (0, ""))


class DetailForm(FlaskForm):
    class Meta:
        csrf = False

    account_item_id = SelectField("Account Item", coerce=int, validators=[Optional()])
    content = StringField("Content", validators=[Optional()])
    applying_date = StringField("Applying Date", validators=[Optional()])
    currency_id = SelectField("Currency", coerce=int, validators=[Optional()])
    unit_price = FloatField("Unit Price", validators=[Optional()])
    quantity = IntegerField("Quantity", validators=[Optional()])
    payment_method_id = SelectField("Payment Method", coerce=int, validators=[Optional()])
    receipt_id = SelectField("Receipt", coerce=int, validators=[Optional()])
    remarks = StringField("Remarks", validators=[Optional()])

    def __init__(self, *args, **kwargs):
        super(DetailForm, self).__init__(*args, **kwargs)
        self.account_item_id.choices = [
            (account_item.id, account_item.accountItemName)
            for account_item in AccountItems.query.all()
        ]
        self.account_item_id.choices.insert(0, (0, ""))
        self.currency_id.choices = [
            (currency.id, currency.name) for currency in Currencies.query.all()
        ]
        self.currency_id.choices.insert(0, (0, ""))
        self.payment_method_id.choices = [
            (payment_method.id, payment_method.paymentMethodName)
            for payment_method in PaymentMethods.query.all()
        ]
        self.payment_method_id.choices.insert(0, (0, ""))
        self.receipt_id.choices = [
            (receipt.id, receipt.receiptName) for receipt in Receipts.query.all()
        ]
        self.receipt_id.choices.insert(0, (0, ""))


class LocationForm(FlaskForm):
    class Meta:
        csrf = False

    location_id = SelectField("Location", coerce=int, validators=[Optional()])

    def __init__(self, *args, **kwargs):
        super(LocationForm, self).__init__(*args, **kwargs)
        self.location_id.choices = [
            (location.id, location.name) for location in Locations1.query.all()
        ]
        self.location_id.choices.insert(0, (0, ""))


class CompleteOrderForm(FlaskForm):
    order = FormField(OrderForm)
    location = FormField(LocationForm)
    rates = FieldList(FormField(RateForm), min_entries=5, max_entries=5)
    details = FieldList(FormField(DetailForm), min_entries=20, max_entries=20)
