"""third

Revision ID: f0148c7d9196
Revises: cd9c978e6319
Create Date: 2024-08-07 09:22:34.216885

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0148c7d9196'
down_revision = 'cd9c978e6319'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('currencies', schema=None) as batch_op:
        batch_op.alter_column('decimal',
               existing_type=sa.INTEGER(),
               type_=sa.Float(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('currencies', schema=None) as batch_op:
        batch_op.alter_column('decimal',
               existing_type=sa.Float(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
