import { BeyondMessage } from "@/types/BeyondMessage";

async function toggleToken(token: Token): Promise<void> {
  if (token.inCombat) return;
  await token.toggleCombat();
}

export async function maybeUpdateInitiative(
  message: BeyondMessage,
  actorId: string | undefined,
) {
  if (actorId === undefined) return;
  if (message.data.action !== "Initiative") return;

  const tokens = game?.actors?.get(actorId)?.getActiveTokens() ?? [];
  await Promise.all(tokens.map(toggleToken));

  const combat = game.combats?.active;
  if (!combat) return;

  // @ts-ignore types haven't been updated for new function yet
  const combatants: Combatant[] = combat.getCombatantsByActor(actorId) ?? [];

  for (const combatant of combatants) {
    if (combatant.id === null) continue;
    combat.setInitiative(combatant.id, message.data.rolls[0].result.total);
  }
}
