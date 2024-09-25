'use strict';

module.exports = (sequelize, DataTypes) => {
  const PurchasedTicket = sequelize.define('PurchasedTicket', {
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  });

  PurchasedTicket.associate = function(models) {
    PurchasedTicket.belongsTo(models.Ticket, {
      foreignKey: 'ticketId',
      as: 'ticket',
    });
  };

  return PurchasedTicket;
};
