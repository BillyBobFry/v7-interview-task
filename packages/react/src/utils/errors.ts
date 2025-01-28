export const UnreachableCaseError = (x: never): never => {
    throw new Error(`Unreachable case: ${x}`);
}