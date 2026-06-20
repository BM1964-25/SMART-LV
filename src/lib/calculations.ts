import { Position, PositionGroup, Project, Summary } from "./types";

export function positionTotal(position: Position): number {
  if (!position.active) return 0;
  return position.quantity * position.unitPrice;
}

export function groupTotal(group: PositionGroup): number {
  if (!group.active) return 0;
  return group.positions.reduce((sum, position) => sum + positionTotal(position), 0);
}

export function calculateSummary(groups: PositionGroup[], project: Project): Summary {
  const linesNet = groups.reduce((sum, group) => sum + groupTotal(group), 0);
  const baseNet = project.flatFee ?? linesNet;
  const discount = baseNet * (project.discountPercent / 100);
  const net = Math.max(baseNet - discount, 0);
  const vat = net * (project.vatRate / 100);

  return {
    net,
    discount,
    vat,
    gross: net + vat
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

export function renumberGroups(groups: PositionGroup[]): PositionGroup[] {
  return groups.map((group, groupIndex) => ({
    ...group,
    positions: group.positions.map((position, positionIndex) => ({
      ...position,
      number: `${groupIndex + 1}.${positionIndex + 1}`
    }))
  }));
}

export function getActivePositions(groups: PositionGroup[]): Position[] {
  return groups.flatMap((group) => (group.active ? group.positions.filter((position) => position.active) : []));
}

export function activeGroups(groups: PositionGroup[]): PositionGroup[] {
  return groups.filter((group) => group.active);
}

export function groupNumber(groups: PositionGroup[], groupId: string): string {
  const groupIndex = activeGroups(groups).findIndex((group) => group.id === groupId);
  return groupIndex >= 0 ? String(groupIndex + 1) : "";
}

export function positionNumber(groups: PositionGroup[], groupId: string, positionId: string): string {
  const visibleGroups = activeGroups(groups);
  const groupIndex = visibleGroups.findIndex((group) => group.id === groupId);
  const group = visibleGroups[groupIndex];
  if (!group) return "";

  const activePositionIndex = group.positions.filter((position) => position.active).findIndex((position) => position.id === positionId);
  if (activePositionIndex < 0) return "entfällt";

  return `${groupIndex + 1}.${activePositionIndex + 1}`;
}
