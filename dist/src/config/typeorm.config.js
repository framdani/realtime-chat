"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'framdani',
    password: '1237',
    database: 'chat',
    entities: [__dirname + '../**/*.entity.ts'],
    synchronize: true,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map