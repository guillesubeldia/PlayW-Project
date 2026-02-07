# 8 Gherkin Scenarios for "Practice Software Testing" - https://practicetestautomation.com/practice-test-automation/
# Each scenario contains at least 4 steps with Keywords: Scenario, Given, When, Then

Feature: Practice Software Testing - Main Features

  # ✅ COMPLETED - RegisterPage implemented
  Scenario: User successfully registers with valid credentials
    Given The user is on the registration page
    When Enters the name "Juan Pérez"
    And Enters the email "juan.perez@example.com"
    And Enters the password "Password123!"
    And Confirms the password "Password123!"
    And Clicks the "Register" button
    Then The user should be redirected to the confirmation page
    And A success message should be visible

  # ✅ COMPLETED - LoginPage implemented
  Scenario: User logs in with correct credentials
    Given The user is on the login page
    When Enters the email "admin@example.com"
    And Enters the password "password123"
    And Clicks the "Login" button
    Then The user should be redirected to the main page
    And The username should appear in the top right corner

  # ❌ MISSING - ProfilePage (not implemented)
  Scenario: User views and edits their user profile
    Given The user is authenticated on the platform
    When The user navigates to the "My Profile" section
    And Clicks the "Edit" button
    And Updates the phone number to "+34 612345678"
    And Clicks the "Save changes" button
    Then The changes should be saved successfully
    And A confirmation message should appear on screen

  # ✅ COMPLETED - MainPage implemented
  Scenario: User views product details correctly
    Given The user is on the main page
    When The user searches for and selects a product
    And The product opens on the details page
    When Reviews the product description, price and images
    Then The product details should be displayed correctly
    And The "Add to cart" button should be visible and active

  # ❌ MISSING - CartPage (not implemented)
  Scenario: User adds products to cart and proceeds to checkout
    Given The user is viewing a product
    When Clicks the "Add to cart" button
    And Navigates to the shopping cart
    And Verifies the product appears in the cart
    And Clicks "Proceed to payment"
    Then The user should be redirected to the checkout page
    And The order summary should display the products correctly

  # ❌ MISSING - FavoritesPage (not implemented)
  Scenario: User marks a product as favorite
    Given The user is on the product page
    When Clicks the heart icon to mark as favorite
    Then The icon should change color indicating it is marked
    And The product should appear in the "My Favorites" section
    And The icon should remain marked when the page is reloaded

  # ❌ MISSING - SearchPage (not implemented)
  Scenario: User searches for a specific product using the search bar
    Given The user is on the main page
    When Clicks on the search bar
    And Enters the product name "Laptop"
    And Presses the "Enter" key or clicks search
    Then The results should show only products matching "Laptop"
    And The number of results should be displayed

  # ❌ MISSING - LanguageSwitcher (not implemented)
  Scenario: User changes the platform language to English
    Given The user is on any page of the platform
    When Clicks on the language selector
    And Selects "English" from the available language list
    Then The entire interface should change to English
    And The change should persist on next navigations
    And All texts, buttons and messages should be in English

  # ❌ MISSING - FilterPage (not implemented)
  Scenario: User filters and sorts products on the main page
    Given The user is on the main products page
    When Clicks on the "Category" filter and selects "Electronics"
    And Clicks on the sort selector and selects "Price: High to Low"
    Then The products displayed should be from the "Electronics" category
    And The products should be sorted from highest to lowest price
    And The number of filtered products should be displayed correctly
