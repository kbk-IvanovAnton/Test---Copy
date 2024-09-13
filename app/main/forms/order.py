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

    currency_id = SelectField("Currency", coerce=int, validators=[Optional()])
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
    unit_price = StringField("Unit Price", validators=[Optional()])
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


# class AllowanceForm(FlaskForm):
#     class Meta:
#         csrf = False

#     departure_date = StringField("Departure Date", validators=[Optional()])
#     return_date = StringField("Return Date", validators=[Optional()])
#     trip_unit_price = IntegerField("Trip Unit Price", validators=[Optional()])
#     trip_days = IntegerField("Trip Days", validators=[Optional()])
#     return_trip_unit_price = IntegerField("Return Trip Unit Price", validators=[Optional()])
#     return_trip_days = IntegerField("Return Trip Days", validators=[Optional()])
#     accomodation_unit_price = IntegerField("Accomodation Unit Price", validators=[Optional()])
#     accomodation_days = IntegerField("Accomodation Days", validators=[Optional()])
#     working_away_unit_price_A = IntegerField("Working Away Unit Price A", validators=[Optional()])
#     working_away_days_A = IntegerField("Working Away Days A", validators=[Optional()])
#     working_away_unit_price_B = IntegerField("Working Away Unit Price B", validators=[Optional()])
#     working_away_days_B = IntegerField("Working Away Days B", validators=[Optional()])
#     special_allowance_unit_price_A = IntegerField(
#         "Special Allowance Unit Price A", validators=[Optional()]
#     )
#     special_allowance_days_A = IntegerField("Special Allowance Days A", validators=[Optional()])
#     special_allowance_unit_price_B = IntegerField(
#         "Special Allowance Unit Price B", validators=[Optional()]
#     )
#     special_allowance_days_B = IntegerField("Special Allowance Days B", validators=[Optional()])
#     exeption_allowance_unit_price = IntegerField(
#         "Exeption Allowance Unit Price", validators=[Optional()]
#     )
#     exeption_allowance_days = IntegerField("Exeption Allowance Days", validators=[Optional()])


class CompleteOrderForm(FlaskForm):
    order = FormField(OrderForm)
    location = FormField(LocationForm)
    # allowance = FormField(AllowanceForm)
    rates = FieldList(FormField(RateForm), min_entries=5, max_entries=5)
    details = FieldList(FormField(DetailForm), min_entries=20, max_entries=20)
