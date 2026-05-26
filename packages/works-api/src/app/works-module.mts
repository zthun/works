import { Module } from "@nestjs/common";

import { ZProjectsModule } from "../projects/projects-module.mjs";

@Module({
  imports: [ZProjectsModule],
})
export class ZWorksModule {}
