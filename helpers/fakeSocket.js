export const allKitsStatusUpdaterFaker = {
  elements: true,
  kitsList: {
    k1000: {
      kitName: 'Nombre kit 1',
      kitStatus: 'bien',
      sensor: {
        k1000s1: {
          nombre: 'Sensor 1 del  kit 1',
          status: 'bien'
        },
        k1000s2: {
          nombre: 'Sensor 2 del kit 1',
          status: 'bien'
        }
      }
    },
    k2000: {
      kitName: 'Nombre kit 2',
      kitStatus: 'bien',
      sensor: {
        k2000s1: {
          nombre: 'Sensor 1 del  kit 2',
          status: 'bien'
        }
      }
    }
  }
};

export const alertFaker = {
  a1234: {
    kitName: 'Test1',
    kitStatus: 'mal',
    sensor: {
      a11234: {
        nombre: 'test1',
        status: 'mal'
      },
      a11235: {
        nombre: 'test2',
        status: 'bien'
      }
    }
  }
};
