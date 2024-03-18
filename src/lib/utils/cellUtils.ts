/**
 * Given a cell identifier, return the bounds of the cell in the form
 * (south latitude, north latitude, west longitude, east longitude).
 *
 * @export
 * @param {string} cell Cell identifier string, corresponds to a path in the quadtree.
 * @return [south latitude, north latitude, west longitude, east longitude]
 */
export function cellBounds(cell: string): [number, number, number, number] {
	let southLat = -90.0;
	let northLat = 90.0;
	let westLon = -180.0;
	let eastLon = 180.0;

	for (const divide of cell) {
		if (parseInt(divide) < 2) {
			southLat = (southLat + northLat) / 2;
		} else {
			northLat = (southLat + northLat) / 2;
		}

		if (parseInt(divide) % 2 === 0) {
			eastLon = (westLon + eastLon) / 2;
		} else {
			westLon = (westLon + eastLon) / 2;
		}
	}

	return [southLat, northLat, westLon, eastLon];
}

/**
 * Given a cell identifier, return the center of the cell in the form
 * (latitude, longitude).
 *
 * @param {string} cell - Cell identifier string, corresponds to a path in the quadtree.
 * @returns [latitude, longitude]
 */
export function cellCenter(cell: string): [number, number] {
	const [southLat, northLat, westLon, eastLon] = cellBounds(cell);
	return [(southLat + northLat) / 2, (westLon + eastLon) / 2];
}
