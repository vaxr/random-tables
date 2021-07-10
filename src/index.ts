export class TableBuilder {
    rows: Row[] = []
    nextOrdinal = 1

    addEntryWithWeight(entry: any, weight: number) {
        this.rows.push(new Row(entry, weight, this.nextOrdinal++))
    }

    build(): Table {
        const table = new Table()
        const totalWeight = this.rows.reduce((total: number, row: Row) => total + row.weight, 0)
        this.rows
            .sort((a, b) => (b.weight - a.weight) || (a.ordinal - b.ordinal))
            .map(row => new Row(row.entry, row.weight / totalWeight, row.ordinal))
            .forEach(row => table.rows.push(row))
        return table
    }
}

class Row {
    entry: any
    weight: number
    ordinal: number

    constructor(entry: any, weight: number, ordinal: number) {
        this.entry = entry
        this.weight = weight
        this.ordinal = ordinal
    }
}

class Table {
    rows: Row[] = []

    getEntryForRoll(roll: number): any {
        for (const row of this.rows) {
            roll -= row.weight
            if (roll < 0) {
                return row.entry
            }
        }
        // TODO throw exception
    }
}
