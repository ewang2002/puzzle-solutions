/// Joins the given list of digits into a single number.
///
/// # Parameters
/// - `digits`: The digits.
///
/// # Returns
/// The number corresponding to the digits given.
pub fn join_digits(digits: &[u32]) -> usize {
    let mut num = 0;
    for digit in digits {
        assert!(
            (0..10).contains(digit),
            "digit should be in range [0, 9], but is actually {digit}"
        );
        num = num * 10 + digit;
    }

    num as usize
}

/// Converts the given number into a list of digits. This doesn't handle negative
/// numbers, so you'll need to provide the absolute value yourself.
///
/// # Parameters
/// - `n`: The number to get the digits for.
///
/// # Returns
/// The digits.
pub fn to_digits<T>(n: T) -> Vec<u32>
where
    T: Into<usize>,
{
    let mut n = n.into();
    if n == 0 {
        return vec![0];
    }

    let mut digits = vec![];
    while n > 0 {
        digits.push((n % 10) as u32);
        n /= 10;
    }

    digits.reverse();
    digits
}

/// Computes the GCD of two integers.
///
/// # Parameters
/// - `a`: The first integer.
/// - `b`: The second integer.
///
/// # Returns
/// The GCD of the two integers.
pub fn gcd<T>(n: T, m: T) -> usize
where
    T: Into<usize>,
{
    let mut n = n.into();
    let mut m = m.into();
    while m != 0 {
        if m < n {
            std::mem::swap(&mut m, &mut n);
        }
        m %= n;
    }

    n
}

/// Computes the LCM of two integers.
///
/// # Parameters
/// - `a`: The first integer.
/// - `b`: The second integer.
///
/// # Returns
/// The LCM of the two integers.
pub fn lcm(a: usize, b: usize) -> usize {
    a * b / gcd(a, b)
}
