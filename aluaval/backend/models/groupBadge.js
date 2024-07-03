import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Student from './student';
import Badge from './badge';
import Group from './group';

const GroupBadge = sequelize.define('GroupBadge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  badge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Badge,
      key: 'id',
    },
  },
  group: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: 'id',
    },
  },
  recipient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  uniqueKeys: {
    unique_student_badge_per_group: {
      fields: ['student', 'badge', 'group']
    }
  }
});

Badge.belongsToMany(Group, { through: GroupBadge, foreignKey: 'badge' });
Group.belongsToMany(Badge, { through: GroupBadge, foreignKey: 'group' });
Student.hasMany(GroupBadge, { foreignKey: 'student' });
GroupBadge.belongsTo(Student, { foreignKey: 'student', as: 'Giver' });
GroupBadge.belongsTo(Student, { foreignKey: 'recipient', as: 'Recipient' });

export default GroupBadge;
