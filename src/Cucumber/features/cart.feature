Feature: Shopping cart

  @smoke @regression
  Scenario: Verify that user is able to add the product to cart
    Given User is logged in successfully
    When User adds the first item to the cart
    Then Item should be successfully added to cart
    When User opens the cart
    Then The cart contains 1 item
