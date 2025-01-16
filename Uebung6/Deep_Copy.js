const deepCopy = (struct) =>
Array.isArray(struct)
? struct.map((item) => deepCopy(item))
: typeof struct === "object" && struct !== null
? Object.fromEntries(
Object.entries(struct).map(([key, value]) => [key, deepCopy(value)])
)
: struct;
// Tests
console.assert(
JSON.stringify(deepCopy([1, [2, 3], { a: 4, b: [5, { c: 6 }] }])) ===
JSON.stringify([1, [2, 3], { a: 4, b: [5, { c: 6 }] }]),
"Array with nested structures test failed"
);
console.assert(
JSON.stringify(deepCopy({ x: 1, y: { z: [2, { w: 3 }] } })) ===
JSON.stringify({ x: 1, y: { z: [2, { w: 3 }] } }),
"Object with nested structures test failed"
);
console.assert(
deepCopy(42) === 42,
"Primitive value test failed"
);
console.assert(
deepCopy(null) === null,
"Null value test failed"
);
console.assert(
JSON.stringify(deepCopy([])) === JSON.stringify([]),
"Empty array test failed"
);
console.assert(
JSON.stringify(deepCopy({})) === JSON.stringify({}),
"Empty object test failed"
);