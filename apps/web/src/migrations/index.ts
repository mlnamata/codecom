import * as migration_20261102_091023_zakladni_model from './20261102_091023_zakladni_model'
import * as migration_20261102_091100_pravidla_a_ochrana from './20261102_091100_pravidla_a_ochrana'

export const migrations = [
  {
    up: migration_20261102_091023_zakladni_model.up,
    down: migration_20261102_091023_zakladni_model.down,
    name: '20261102_091023_zakladni_model',
  },
  {
    up: migration_20261102_091100_pravidla_a_ochrana.up,
    down: migration_20261102_091100_pravidla_a_ochrana.down,
    name: '20261102_091100_pravidla_a_ochrana',
  },
]
