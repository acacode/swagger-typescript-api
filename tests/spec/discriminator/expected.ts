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

export enum BlockDTOEnum {
  Csv = "csv",
  File = "file",
  Kek = "kek",
}

export type BlockDTOWithEnum = AbstractBlockDtoWithEnum & (CsvBlockWithEnumDTO | FileBlockWithEnumDTO);

export type CsvBlockWithEnumDTO = AbstractBlockDtoWithEnum & {
  type: BlockDTOEnum.Csv;
  text: string;
};

export type FileBlockWithEnumDTO = AbstractBlockDtoWithEnum & {
  type: BlockDTOEnum.File;
  fileId: string;
};

export type BlockDTO = AbstractBlockDto & (CsvBlockDTO | FileBlockDTO);

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
    | AbstractPetPetTypeMapping<"dog", Dog>
    | AbstractPetPetTypeMapping<"cat", Cat>
    | AbstractPetPetTypeMapping<"lizard", Lizard>
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

export enum PetEnum {
  Dog = "dog",
  Lizard = "lizard",
  Cat = "cat",
}

export type PetWithEnum = AbstractPetWithEnum &
  (
    | AbstractPetWithEnumPetTypeMapping<PetEnum.Dog, DogWithEnum>
    | AbstractPetWithEnumPetTypeMapping<PetEnum.Cat, CatWithEnum>
    | AbstractPetWithEnumPetTypeMapping<PetEnum.Lizard, LizardWithEnum>
  );

export type CatWithEnum = AbstractPetWithEnum & {
  name?: string;
};

export type DogWithEnum = AbstractPetWithEnum & {
  bark?: string;
};

export type LizardWithEnum = AbstractPetWithEnum & {
  lovesRocks?: boolean;
};

interface AbstractBlockDtoWithEnum {
  title: string;
  type: BlockDTOEnum;
}

interface AbstractBlockDto {
  title: string;
}

interface AbstractPet {
  pet_type: string;
}

type AbstractPetPetTypeMapping<Key, Type> = {
  pet_type: Key;
} & Type;

interface AbstractPetWithEnum {
  pet_type: PetEnum;
}

type AbstractPetWithEnumPetTypeMapping<Key, Type> = {
  pet_type: Key;
} & Type;
