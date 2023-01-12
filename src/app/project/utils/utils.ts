import { SelectItem, SelectItemGroup } from 'primeng/api';
import { Tech } from '../models/Tech.model';
import { TechType } from '../models/TechType.model';

export const getSelectItemGroup = (techsList: Tech[]): SelectItemGroup[] => {
  if (!techsList) {
    return [];
  }
  let techTypes: TechType[] = techsList
    .map((response) => response.tipo)
    .filter(
      (techType, index, self) =>
        self.findIndex((value) => value.id === techType.id) === index
    );

  return techTypes
    .map((techType) => ({
      label: techType.name,
      value: techType,
      items: techsList
        .filter((tech) => tech.tipo.id === techType.id)
        .map((tech) => ({ label: tech.name, value: tech } as SelectItem<Tech>)),
    }))
    .sort((a, b) => a.value.id - b.value.id);
};
