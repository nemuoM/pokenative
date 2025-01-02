export function getPokemonId(url: string): number{
    return parseInt(url.split('/').at(-2)!, 10)
}

export function getPokemonArtWork(id: number | string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatWeight(weight?: number): string{
    if (!weight) {
        return "--";
    }
    return (weight/10).toString().replace('.', ',') + 'kg'
}

export function formatSize(size?: number): string{
    if (!size) {
        return "--";
    }
    return (size/10).toString().replace('.', ',') + 'm'
}

export const baseStat = [
    {
      "base_stat": 0,
      "stat": {
        "name": "hp",
      }
    },
    {
      "base_stat": 0,
      "stat": {
        "name": "attack",
      }
    },
    {
      "base_stat": 0,
      "stat": {
        "name": "defense",
      }
    },
    {
      "base_stat": 0,
      "stat": {
        "name": "special-attack",
      }
    },
    {
      "base_stat": 0,
      "stat": {
        "name": "special-defense",
      }
    },
    {
      "base_stat": 0,
      "stat": {
        "name": "speed",
      }
    }
  ]