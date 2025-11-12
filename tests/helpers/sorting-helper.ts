import { expect } from "@playwright/test";

export async function assertSortingOrder<T>(actualArray: T[], order: "asc" | "desc") {
    const sortedArray = [...actualArray].sort((a, b) => {
        if (typeof a === "string" && typeof b === "string") {
            return order === "asc"
                ? a.localeCompare(b)
                : b.localeCompare(a);
        } else if (typeof a === "number" && typeof b === "number") {
            return order === "asc" ? a - b : b - a;
        } else {
            throw new Error("Array must contain either all strings or all numbers");
        }
    });

    console.log(`Actual Array: ${actualArray}`);
    console.log(`Expected Sorted Array (${order}): ${sortedArray}`);
    
    try {
        expect(actualArray).toEqual(sortedArray);
    } catch {
        throw new Error(
            `Array is not sorted in ${order} order. Actual: ${actualArray}, Expected: ${sortedArray}`
        );
    }
}