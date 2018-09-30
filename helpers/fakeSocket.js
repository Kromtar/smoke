export const allKitsStatusUpdaterFaker = {
  elements: true,
  kitsList: {
    a1234: {
      kitName: 'Test1',
      kitStatus: 'bien',
      sensor: {
        a11234: {
          nombre: 'test1',
          status: 'bien'
        },
        a11235: {
          nombre: 'test2',
          status: 'bien'
        }
      }
    },
    a1235: {
      kitName: 'Test2',
      kitStatus: 'bien',
      sensor: {
        a115364: {
          nombre: 'test1',
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
