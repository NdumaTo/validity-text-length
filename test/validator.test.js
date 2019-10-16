const validate = require('../validator')
const assert = require('assert')

describe('validity-length', () => {
  it('should not allow max < 1', () => {
    assert.throws(() =>
      validate(null, -1)(
        'firstName',
        'First Name',
        { firstName: 'T' },
        (error, validationError) => {}
      )
    ),
      { message: 'max must be >=1' }
  })

  it('Should not allow min > max', () => {
    assert.throws(
      () =>
        validate(5, 2)(
          'firstName',
          'First Name',
          { firstName: 'T' },
          (error, validationError) => {}
        ),
      { message: 'max must be larger than min' }
    )
  })

  it('Should not allow non string inputs', () => {
    assert.throws(
      () =>
        validate(null, null)(
          'firstName',
          'First Name',
          { firstName: 12345 },
          (error, validationError) => {}
        ),
      { message: 'firstName must be a string' }
    )
  })

  it('should not allow characters more than max', () => {
    validate(null, 2)(
      'firstName',
      'First Name',
      { firstName: 'Test' },
      (error, validationError) => {
        assert.equal(error, null),
          assert.equal(
            validationError,
            'First Name must have no more than 2 characters'
          )
      }
    )
  })

  it('should not allow characters fewer than min', () => {
    validate(2, null)(
      'firstName',
      'First Name',
      { firstName: 'T' },
      (error, validationError) => {
        assert.equal(error, null),
          assert.equal(
            validationError,
            'First Name must have no less than 2 characters'
          )
      }
    )
  })

  it('should not allow characters out of range', () => {
    validate(2, 3)(
      'firstName',
      'First Name',
      { firstName: 'Test' },
      (error, validationError) => {
        assert.equal(error, null),
          assert.equal(
            validationError,
            'First Name must have between 2 and 3 characters'
          )
      }
    )
  })

  it('should not allow characters outside fixed length', () => {
    validate(3, 3)(
      'firstName',
      'First Name',
      { firstName: 'Test' },
      (error, validationError) => {
        assert.equal(error, null),
          assert.equal(validationError, 'First Name must have 3 characters')
      }
    )
  })

  it('should not count common emojis as multiple characters', () => {
    validate(1, 1)(
      'firstName',
      'First Name',
      { firstName: '😀' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow characters equal to min', () => {
    validate(1, null)(
      'firstName',
      'First Name',
      { firstName: 'T' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow characters equal to max', () => {
    validate(null, 4)(
      'firstName',
      'First Name',
      { firstName: 'Test' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow characters equal to a fixed length', () => {
    validate(4, 4)(
      'firstName',
      'First Name',
      { firstName: 'Test' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow emoji strings equal to min', () => {
    validate(1, null)(
      'firstName',
      'First Name',
      { firstName: '🏳️‍🌈' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow emoji strings equal to max', () => {
    validate(null, 4)(
      'firstName',
      'First Name',
      { firstName: '👈👉👆👇' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow emoji strings equal to a fixed length', () => {
    validate(4, 4)(
      'firstName',
      'First Name',
      { firstName: '👈👉👆👇' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow mixed strings equal to min', () => {
    validate(2, null)(
      'firstName',
      'First Name',
      { firstName: 'T😀' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow mixed strings equal to max', () => {
    validate(null, 4)(
      'firstName',
      'First Name',
      { firstName: 'T😀s😃' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should allow mixed strings equal to a fixed length', () => {
    validate(4, 4)(
      'firstName',
      'First Name',
      { firstName: 'T😀s😃' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })

  it('should count compound emojis as one character', () => {
    validate(null, 2)(
      'firstName',
      'First Name',
      { firstName: '🏳️‍🌈👶🏿' },
      (error, validationError) => {
        assert.equal(error, null), assert.equal(validationError, null)
      }
    )
  })
})
