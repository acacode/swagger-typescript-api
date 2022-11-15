/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type SimpleDiscriminator = SimpleObject | ComplexObject;

export interface SimpleObject {
  objectType: string;
}

export interface ComplexObject {
  objectType: string;
}

export type BlockDTO = AbstractBlockDto &
  (
    | (CsvBlockDTO | FileBlockDTO)
    | (
        | ({
            type: "csv";
          } & CsvBlockDTO)
        | ({
            type: "file";
          } & FileBlockDTO)
      )
  );

export type CsvBlockDTO = AbstractBlockDto & {
  /** @default "csv" */
  type: "csv";
  text: string;
};

export type FileBlockDTO = AbstractBlockDto & {
  /** @default "file" */
  type: "file";
  fileId: string;
};

export type Pet = AbstractPet &
  (
    | ({
        pet_type: "dog";
      } & Dog)
    | ({
        pet_type: "cat";
      } & Cat)
    | ({
        pet_type: "lizard";
      } & Lizard)
  );

export type Cat = AbstractPet & {
  name?: string;
};

export type Dog = AbstractPet & {
  bark?: string;
};

export type Lizard = AbstractPet & {
  lovesRocks?: boolean;
};

interface AbstractBlockDto {
  title: string;
}

interface AbstractPet {
  pet_type: string;
}
