import { ZNestApplication, ZNestApplicationModule } from '@zthun/works.nest';

ZNestApplication.create(ZNestApplicationModule).then((app) => ZNestApplication.run(app));
