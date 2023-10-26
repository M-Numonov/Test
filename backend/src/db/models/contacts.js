const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contacts = sequelize.define(
    'contacts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  contacts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.contacts.hasMany(db.leads, {
      as: 'leads_contact',
      foreignKey: {
        name: 'contactId',
      },
      constraints: false,
    });

    //end loop

    db.contacts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contacts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contacts;
};
