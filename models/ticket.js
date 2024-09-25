'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    qrCode: {
      type: DataTypes.STRING
    },
    ticketType: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Ticket.associate = function(models) {
    Ticket.hasMany(models.PurchasedTicket, {
      foreignKey: 'ticketId',
      as: 'purchasedTickets',
    });
  };

  return Ticket;
};
