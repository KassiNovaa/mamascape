"""empty message

Revision ID: 341e5d03520d
Revises: 4b66a6b92da6
Create Date: 2023-12-11 14:48:53.374421

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '341e5d03520d'
down_revision = '4b66a6b92da6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('affirmations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('like_count', sa.Integer(), nullable=True))

    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('like_count', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_column('like_count')

    with op.batch_alter_table('affirmations', schema=None) as batch_op:
        batch_op.drop_column('like_count')

    # ### end Alembic commands ###
